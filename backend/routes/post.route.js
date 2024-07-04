const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post.model.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, age, tweetmsg } = req.body; // Make sure this matches the frontend

  try {
    const PostAdded = await Post.create({
      name,
      email,
      age,
      tweetmsg,
    });
    res.status(201).json(PostAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showAll = await Post.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singlePost = await Post.findById(id);
    if (!singlePost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(singlePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singlePost = await Post.findByIdAndDelete(id);
    if (!singlePost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(singlePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age, tweetmsg } = req.body;
  try {
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatePost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
