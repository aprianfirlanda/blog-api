const { Post } = require('../models');


// Get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};

// Get post by ID
exports.getPostById = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

// Create a new post (authenticated)
exports.createPost = async (req, res) => {
  const { content } = req.body;
  const authorId = req.user.id; // user injected by auth middleware
  if (!content) return res.status(400).json({ error: "Content required" });
  const post = await Post.create({ content, authorId });
  res.status(201).json(post);
};

// Update post (auth, must own)
exports.updatePost = async (req, res) => {
  const { content } = req.body;
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.authorId !== req.user.id)
    return res.status(403).json({ error: "Not your post" });

  post.content = content || post.content;
  await post.save();
  res.json(post);
};

// Delete post (auth, must own)
exports.deletePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.authorId !== req.user.id)
    return res.status(403).json({ error: "Not your post" });

  await post.destroy();
  res.status(204).send();
};
