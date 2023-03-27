const express = require('express');
const { register, login, logout } = require('../../controllers/auth');
const { registerValidator, loginValidator } = require('../../utils');
const { auth, validation } = require('../../middlewares');

const router = express.Router();

router.post('/register', validation(registerValidator), register);
router.post('/login', validation(loginValidator), login);
router.post('/logout', auth, logout);

module.exports = router;
