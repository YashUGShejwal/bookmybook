const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  jwtVerify,
  reCaptchaVerify,
} = require('../controllers/UserController');

// const { isAdmin } = require("../middlewares/isAdmin");

router.post('/signup', signup);
router.get('/jwtVerify', jwtVerify);
router.post('/login', login);
router.post('/recaptchaVerify', reCaptchaVerify);

module.exports = router;
