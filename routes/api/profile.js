const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @router  GET api/profile/me
// @desc    fetch user profile
// @access  Private
router.get('/jeff', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile does not exist' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router  POST api/profile/
// @desc    Create or update user profile
// @access  Private

// [*] using two middleware to auth and validate
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('bio', 'Bio is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    // extract fields from req.body
    const { user, status, bio, likes } = req.body;

    // build profile object with fields
    let makeProfile = {};
    makeProfile.user = req.user.id;

    if (status) {
      makeProfile.status = status;
    }
    if (bio) {
      makeProfile.bio = bio;
    }
    if (likes) {
      makeProfile.likes = likes.split(',').map(like => like.trim());
    }

    // in try block, find the profile of user with matching user.id and build profile, save to db
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      // if a profile exist - find it and udpate profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: makeProfile },
          { new: true }
        );
        res.json(profile);
      }

      // if profile DNE - create one
      profile = new Profile(makeProfile);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @router  POST api/profile/all
// @desc    Get all profile
// @access  Public
router.get('/all', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router  POST api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    let profile = await Profile.find({
      user: req.params.user_id
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile does not exist ' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router  Delete api/profile/
// @desc    Delete profile user and post
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove user post

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'user removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
