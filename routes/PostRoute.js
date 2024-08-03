const express = require("express");
const { getAllPost, createPost, getSinglePost } = require("../controllers/PostController");
const router = express.Router();

router.get("/", getAllPost);
router.post("/", createPost);
router.get("/:id", getSinglePost)

module.exports = router;
