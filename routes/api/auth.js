const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @router  GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router  Post api/auth
// @desc    Authenticate User/login
// @access  Public
router.post(
  '/',
  [
    // check for email and password field when login
    check('password', 'Password is reqired to login').exists(),
    check('email', 'Email is required').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // check user !exist in db
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email or password is invalid' }] });
      }

      // if user exists in DB - use bcrypt to compare entered password and password from DB
      const truePass = await bcrypt.compare(password, user.password);

      if (!truePass) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email or password is invalid' }] });
      }

      // [*] Send JWT after successful login - create payload, sign, and send token to user
      const payload = {
        user: {
          id: user._id
        }
      };
      const secret = config.get('jwtSecret');
      jwt.sign(payload, secret, { expiresIn: '10hr' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);
module.exports = router;
