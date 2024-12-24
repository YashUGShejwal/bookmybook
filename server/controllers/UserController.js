const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const axios = require('axios');
const signup = async (req, res) => {
  var { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword || !phone)
    res.status(422).send({ message: 'Enter all fields' });
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).send({ message: 'User with this email already exists' });
    } else if (password !== cpassword) {
      res.status(422).send({ message: 'Passwords do not match' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      const user = new User({ name, email, password, phone });
      const saveUser = await user.save();
      if (saveUser)
        res.status(200).send({ message: 'User created successfully' });
    }
  } catch (error) {
    console.log('Error', error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email or password cannot be blank' });
    }
    const userLogin = await User.findOne({ email: email }).populate('cart');
    if (userLogin) {
      const isValid = await bcrypt.compare(password, userLogin.password);
      if (!isValid) {
        res.status(400).json({ message: 'Incorrect Credentials' });
      } else {
        const token = jwt.sign(
          {
            _id: userLogin._id,
            name: userLogin.name,
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: '14000000m',
          }
        );
        return res
          .status(200)
          .json({ message: 'Login Successfull!', token, userLogin });
      }
    } else {
      res.status(400).send({ message: 'User does not exist' });
    }
  } catch (error) {
    console.log(error);
  }
};

const jwtVerify = async (req, res) => {
  const token = req.headers.authorization;
  console.log(`token: ${token}`);
  if (!token) {
    return res.status(400).send({ message: 'Invalid Token' });
  }

  const decodeToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (decodeToken) {
    const user = await User.findById(decodeToken._id).populate({
      path: 'cart',
      populate: 'items',
    });
    //   .populate("rentals")
    return res.send({ message: 'User Validated', user });
  }
  res.status(400).send({ message: 'Invalid Token' });
};
const reCaptchaVerify = async (req, res) => {
  const { token } = req.body;
  console.log(req.body);
  const data = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  res.status(200).send({ message: 'humannn', data: data.data });
};
module.exports = {
  signup,
  login,
  jwtVerify,
  reCaptchaVerify,
};
