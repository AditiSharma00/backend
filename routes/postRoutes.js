const express = require("express");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../Controllers/postControllers");
const router = express.Router();
const jwt = require("jsonwebtoken");
const middleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access Denied due to no token");
  }
  try {
    let decoded = jwt.verify(token, process.env.secret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};
router.post("/create", middleware, createPost);
router.get("/", middleware, getPost);
router.patch("/update/:id", middleware, updatePost);
router.delete("/delete/:id", middleware, deletePost);

module.exports = router;
