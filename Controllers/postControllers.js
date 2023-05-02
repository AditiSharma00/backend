const { Post } = require("../Models/postModel");
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  try {
    let { title, body, device } = req.body;
    const obj = {
      title,
      body,
      device,
      author: req.userId,
    };
    const post = await Post.create(obj);
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getPost = async (req, res) => {
  try {
    const { device } = req.query;
    let query = { author: req.userId };
    if (device) {
      query.device = device;
    }
    const postdata = await Post.find(query);
    res.status(200).json({ postdata });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.send("Post not found");
    }
    if (post.author.toString() !== req.userId) res.send("Not authorised");
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.send("Post not found");
    }
    if (post.author.toString() !== req.userId) res.send("Not authorised");
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("post deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { createPost, getPost, updatePost, deletePost };
