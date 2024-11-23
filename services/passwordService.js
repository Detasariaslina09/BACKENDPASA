class PasswordService {
    constructor() {
        this.strengthLevels = {
            WEAK: 1,
            MEDIUM: 2,
            STRONG: 3
        };
    }

    checkStrength(password) {
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
        let requirements = [];

        if (criteriaCount <= 2) {
            strengthLevel = this.strengthLevels.WEAK;
            strengthName = "weak";
            message = "Password lemah";
        } else if (criteriaCount <= 3) {
            strengthLevel = this.strengthLevels.MEDIUM;
            strengthName = "medium";
            message = "Password sedang";
        } else {
            strengthLevel = this.strengthLevels.STRONG;
            strengthName = "strong";
            message = "Password kuat";
        }

        // Tambahkan requirements yang belum terpenuhi
        if (!hasMinLength) requirements.push("Minimal 8 karakter");
        if (!hasUpperCase) requirements.push("Minimal 1 huruf besar");
        if (!hasLowerCase) requirements.push("Minimal 1 huruf kecil");
        if (!hasNumbers) requirements.push("Minimal 1 angka");
        if (!hasSpecialChars) requirements.push("Minimal 1 karakter spesial");

        return {
            strengthLevel,          // nilai numerik (1, 2, atau 3)
            strengthName,           // nama level (weak, medium, strong)
            message,               // pesan deskriptif
            analysis: {           // detail analisis
                hasMinLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChars,
                criteriaCount
            },
            missingRequirements: requirements  // requirements yang belum terpenuhi
        };
    }
}

module.exports = PasswordService;