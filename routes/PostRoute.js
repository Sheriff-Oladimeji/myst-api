const express = require("express");
const { getAllPost, createPost, getSinglePost, getRandomPost } = require("../controllers/PostController");
const router = express.Router();

router.get("/", getAllPost);
router.post("/", createPost);
router.get("/qod", getRandomPost )
router.get("/:id", getSinglePost)

module.exports = router;
