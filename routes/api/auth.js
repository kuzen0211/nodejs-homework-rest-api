const express = require('express');
const {
    register,
    login,
    logout,
    verifyEmail,
    resendVerifyEmail,
} = require('../../controllers/auth');
const {
    registerValidator,
    loginValidator,
    emailValidator,
} = require('../../utils');
const { auth, validation } = require('../../middlewares');

const router = express.Router();

router.post('/register', validation(registerValidator), register);
router.get('/verify/:verificationCode', verifyEmail);
router.post('/verify', validation(emailValidator), resendVerifyEmail);
router.post('/login', validation(loginValidator), login);
router.post('/logout', auth, logout);

module.exports = router;
