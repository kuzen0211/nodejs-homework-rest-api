const express = require('express');
const validation = require('../../middlewares/validation');
const { register, login } = require('../../controllers/auth');
const { registerValidator, loginValidator } = require('../../utils');

const router = express.Router();

router.post('/register', validation(registerValidator), register);
router.post('/login', validation(loginValidator), login);
router.post('/logout');

module.exports = router;
