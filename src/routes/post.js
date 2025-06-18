const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateJWT = require('../middlewares/auth');

// Public
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Authenticated
router.post('/', authenticateJWT, postController.createPost);
router.put('/:id', authenticateJWT, postController.updatePost);
router.delete('/:id', authenticateJWT, postController.deletePost);

module.exports = router;
