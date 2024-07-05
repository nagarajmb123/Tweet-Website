const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Post = require("../models/post.model.js");
require("dotenv").config();

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Destination folder for uploaded files (temporary storage)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  },
});

const upload = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Route for adding a new post with photo upload to Cloudinary
router.post("/", upload.single("photo"), async (req, res) => {
  const { name, tweetmsg } = req.body;
  let photo;

  try {
    // Upload photo to Cloudinary if exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern_stack_app/posts", // Optional: Specify a folder in Cloudinary
      });
      photo = result.secure_url; // Save the Cloudinary URL to use in MongoDB
    }

    const PostAdded = await Post.create({
      name,
      tweetmsg,
      photo,
    });

    res.status(201).json(PostAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Route for getting all posts
router.get("/", async (req, res) => {
  try {
    const showAll = await Post.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Route for getting a single post by ID
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

// Route for deleting a post by ID
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

// Route for updating a post including photo upload to Cloudinary
router.patch("/:id", upload.single("photo"), async (req, res) => {
  const { name, tweetmsg } = req.body;
  let photo;

  try {
    // Upload photo to Cloudinary if exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto", 
      });
      photo = result.secure_url; // Save the Cloudinary URL to use in MongoDB
    }

    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        name,
        tweetmsg,
        photo,
      },
      { new: true }
    );

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








/*const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post.model.js");
const multer = require("multer");

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  }
});

const upload = multer({ storage: storage });

// Route for adding a new post with photo upload
router.post("/", upload.single('photo'), async (req, res) => {
  const { name, tweetmsg } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const PostAdded = await Post.create({
      name,
      tweetmsg,
      photo
    });
    res.status(201).json(PostAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Route for getting all posts
router.get("/", async (req, res) => {
  try {
    const showAll = await Post.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Route for getting a single post by ID
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

// Route for deleting a post by ID
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

// Route for updating a post including photo upload
router.patch("/:id", upload.single('photo'), async (req, res) => {
  const { name, tweetmsg } = req.body;
  const photo = req.file ? req.file.path : undefined;

  try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
      name,
      tweetmsg,
      photo
    }, { new: true });
    
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
*/
