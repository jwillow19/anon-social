const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');
const Chat = require('../../models/Chats');

const auth = require('../../middleware/auth');

// @router  POST api/posts
// @desc    post chat to channel
// @access  Private
router.post(
  '/',
  [
    // authenticates user and check if post field is not empty
    auth,
    check('msg', 'write something').not().isEmpty(),
    check('channel', 'specify which channel').not().isEmpty(),
  ],
  async (req, res) => {
    // check validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      // if no error - create Post document by fetching user data from DB
      const user = await User.findById(req.user.id).populate('-password');

      let newChat = new Chat({
        msg: req.body.msg,
        name: user.name,
        user: user.id,
        channel: req.body.channel,
      });

      await newChat.save();
      res.json(newChat);
    } catch (exception) {
      console.error(exception.message);
      res.status(500).send('Server error');
    }
  }
);

// @router  GET api/posts
// @desc    Get all chats
// @access  Private

router.get('/:channel', auth, async (req, res) => {
  try {
    // find all chat sorted by most recent
    const chats = await Chat.find({ channel: req.params.channel })
      .sort({ date: 'asc' })
      .select('name user msg channel date');
    res.json(chats);
  } catch (exception) {
    console.error(exception.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
