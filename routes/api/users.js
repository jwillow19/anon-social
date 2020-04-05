const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();
// Grab user model
const User = require('../../models/Users');

// @router  Post api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    // username is required
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    // email check
    check('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password is 8 or more characters').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // check if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // if user does not exist - create user isntance, hash password with bcrypt
      else {
        user = new User({
          name,
          email,
          password
        });
        // [*] Encryption - salt and hash password with bcrypt
        const saltRounds = 10;
        user.password = await bcrypt.hash(password, saltRounds);
        await user.save();

        // [*] Send JWT after registration - create payload, sign, and send token back to user
        const payload = {
          user: {
            id: user._id
          }
        };
        const secret = config.get('jwtSecret');
        jwt.sign(payload, secret, { expiresIn: '1hr' }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }
      // return jsonwebtoken to login immediately
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
