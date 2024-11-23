class PasswordService {
    constructor() {
        this.strengthLevels = {
            WEAK: 1,
            MEDIUM: 2,
            STRONG: 3
        };
        this.commonPasswords = ["password", "123456", "qwerty", "abc123", "admin", "iloveyou", "admin123"]; // Kata sandi umum
    }

    validateInput(password) {
        // Periksa apakah password kosong
        if (!password || password.trim() === "") {
            throw new InputError("Password tidak boleh kosong.");
        }

        // Periksa apakah password terlalu panjang
        if (password.length > 20) {
            throw new InputError("Agar mudah diingat, Password tidak boleh lebih dari 20 karakter.");
        }

        // Periksa apakah password adalah pola berulang (contoh: "abcabc")
        const repeatedPattern = /(\w+)\1+/;  // Cari substring yang diulang
        if (repeatedPattern.test(password)) {
            throw new InputError("Password mengandung pola berulang seperti 'abab', 'aabb' atau '123123'.");
        }

        // Periksa apakah password adalah password umum
        if (this.commonPasswords.includes(password.toLowerCase())) {
            throw new InputError("Password termasuk dalam kategori umum. Gunakan password yang lebih unik.");
        }
    }

    getRecommendations(passwordAnalysis) {
        const recommendations = [];
        if (!passwordAnalysis.hasMinLength) recommendations.push("Tambahkan lebih banyak karakter (minimal 8).");
        if (!passwordAnalysis.hasUpperCase) recommendations.push("Gunakan minimal 1 huruf besar.");
        if (!passwordAnalysis.hasLowerCase) recommendations.push("Gunakan minimal 1 huruf kecil.");
        if (!passwordAnalysis.hasNumbers) recommendations.push("Gunakan minimal 1 angka.");
        if (!passwordAnalysis.hasSpecialChars) recommendations.push("Tambahkan minimal 1 karakter spesial (!@#$%^&*).");

        return recommendations;
    }

    checkStrength(password) {
        this.validateInput(password);

        // Kriteria dasar
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Hitung total kriteria yang terpenuhi
        const criteriaCount = [
            hasMinLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChars
        ].filter(Boolean).length;

        // Tentukan level kekuatan password
        let strengthLevel;
        let strengthName;
        let message;

        if (criteriaCount <= 2) {
            strengthLevel = this.strengthLevels.WEAK;
            strengthName = "weak";
            message = "Password lemah.";
        } else if (criteriaCount <= 4) {
            strengthLevel = this.strengthLevels.MEDIUM;
            strengthName = "medium";
            message = "Password sedang.";
        } else {
            strengthLevel = this.strengthLevels.STRONG;
            strengthName = "strong";
            message = "Password kuat.";
        }

        // Tambahkan rekomendasi
        const recommendations = this.getRecommendations({
            hasMinLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChars
        });

        return {
            strengthLevel,
            strengthName,
            message,
            analysis: {
                hasMinLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChars,
                criteriaCount
            },
            recommendations
        };
    }
}

// Custom Error Class
class InputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InputError";
    }
}

module.exports = PasswordService;
