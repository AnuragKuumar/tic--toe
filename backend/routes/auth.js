const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup');

router.post('/register', checkDuplicateUsernameOrEmail, authController.register);
router.post('/login', authController.login);

module.exports = router;
