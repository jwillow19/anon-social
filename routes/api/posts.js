const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Posts');
const User = require('../../models/Users');
const Profile = require('../../models/Profile');

const auth = require('../../middleware/auth');

// @router  Post api/posts
// @desc    Make post
// @access  Private
router.post(
  '/',
  [
    // authenticates user and check if post field is not empty
    auth,
    check('postContent', 'Post something')
      .not()
      .isEmpty()
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

      let newPost = new Post({
        postContent: req.body.postContent,
        name: user.name,
        user: user.id
      });

      await newPost.save();
      res.json(newPost);
    } catch (exception) {
      console.error(exception.message);
      res.status(500).send('Server error');
    }
  }
);

// @router  DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    // if post DNE - prompt Post not found
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user owns the post - if Yes: can delete
    if (post.user.toString() == req.user.id) {
      await post.remove();
      res.send('Post deleted');
    }

    return res.status(401).json({ msg: 'Not authorized to remove post' });
  } catch (exception) {
    console.error(exception.message);
    res.status(500).send('Server error');
  }
});

// @router  GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    // find all posts sorted by most recent
    const posts = await Post.find()
      .sort({ date: 'desc' })
      .select('name postContent likes dislikes comments date');
    res.json(posts);
  } catch (exception) {
    console.error(exception.message);
    res.status(500).send('Server error');
  }
});

// @router  GET api/posts/:id
// @desc    Get post by id
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    // find post by id
    const postId = req.params.id;
    const post = await Post.findById(postId).select(
      'name postContent likes dislikes comments date'
    );

    // case: no postid - post not found
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (exception) {
    console.error(exception.message);
    res.status(500).send('Server error');
  }
});

// @router  PUT api/posts/like/:id
// @desc    like a post
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if post.likes (array of obj) has user.id => true: already liked post
    if (
      post.likes.some(like => {
        return req.user.id == like.user.toString();
      })
    ) {
      return res.status(400).json({ msg: 'Already liked post' });
    }

    // first time liking post
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (exception) {
    console.error(exception.message);
    res.status(500).send('Server error');
  }
});

// @router  PUT api/posts/unlike/:id
// @desc    like a post
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // if user.id not in any likes.user
    if (
      post.likes.some(like => {
        return req.user.id !== like.user.toString();
      })
    ) {
      return res.status(400).json({ msg: 'Did not like post yet' });
    }

    // if post is liked - can unlike by finding liked-user index and splice
    const ind = post.likes.findIndex(like => {
      return like.user.toString() == req.user.id;
    });
    post.likes.splice(ind, 1);

    await post.save();

    res.json(post.likes);
  } catch (exception) {
    console.error(exception.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
