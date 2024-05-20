const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Example route to fetch comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({ where: { postId } });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      // Fetch the username of the comment creator
    const commentCreator = await User.findByPk(req.session.user_id);
    newComment.username = commentCreator.username;

    // Add the current date to the comment
    newComment.created_at = new Date();

   // Update the post to include the new comment
   const postId = req.body.post_id;
   await Post.update(
     { 
       comments: sequelize.fn('array_append', sequelize.col('comments'), newComment.id), 
       comment_authors: sequelize.fn('array_append', sequelize.col('comment_authors'), username),
       comment_dates: sequelize.fn('array_append', sequelize.col('comment_dates'), currentDate)
     },
     { where: { id: postId } }
   );

      res.status(200).json(newComment);
    } catch (err) {
      console.error('Error creating comment:', err);
      res.status(400).json(err);
    }
  });

  module.exports = router;