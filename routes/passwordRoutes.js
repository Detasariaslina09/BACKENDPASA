const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

// Route untuk mengecek password
router.post('/check', passwordController.checkPassword);

module.exports = router;