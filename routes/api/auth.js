const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
// @router  GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = (await User.findById(req.user.id)).select('-password');
  } catch (err) {
    console.error(err.message);
    res, status(500).send('Server error');
  }
});

module.exports = router;
