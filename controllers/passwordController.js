const PasswordService = require('../services/passwordService');
const passwordService = new PasswordService();

class PasswordController {
    checkPassword(req, res) {
        try {
            const { password } = req.body;
            
            if (!password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Password tidak boleh kosong'
                });
            }

            const result = passwordService.checkStrength(password);
            
            res.json({
                status: 'success',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new PasswordController();