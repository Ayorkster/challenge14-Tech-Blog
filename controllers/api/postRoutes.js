const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth')
const Posts = require('../../models/Posts');
// const Comments = require('../../models/Comments');

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json(err);
  }
});

// // Display an individual blog post and comments
// router.get('/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Posts.findByPk(postId, {
//       include: Comment, // Include comments associated with the post
//     });

//     res.render('post', { post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Add a new comment to a post
// router.post('/:id/comments', async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const { text, username } = req.body;
//     const comment = await Comments.create({ text, username, postId });

//     // Redirect to the post page after adding a comment
//     res.redirect(`/post/${postId}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Posts.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!postData) {
//       res.status(404).json({ message: 'No post found with this id!' });
//       return;
//     }

//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.post('/', withAuth, async (req, res) => {
//   try {
//     console.log(req.body);
//     console.log(req.session.user_id);
//     const newPost = await Posts.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     console.log(newPost);
//     res.status(200).json(newPost);
//   } catch (err) {
//     console.log(err.stack);
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

module.exports = router;