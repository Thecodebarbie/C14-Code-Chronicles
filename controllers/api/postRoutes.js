const router = require('express').Router();
const { Post } = require('../../models');

const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle comment submission
router.post('/post/:id/comment', async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        post_id: req.params.id,
        user_id: req.session.user_id // Assuming the user is logged in and their ID is stored in the session
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Fetch comments for a specific post
router.get('/:id/comments', async (req, res) => {
    try {
      const postId = req.params.id;
      const comments = await Comment.findAll({ where: { post_id: postId } });
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

module.exports = router;
