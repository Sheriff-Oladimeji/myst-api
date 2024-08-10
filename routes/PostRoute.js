const express = require("express");
const { getAllPost, createPost, getSinglePost, getRandomPost, getAllCategories, getPostsByCategory } = require("../controllers/PostController");
const router = express.Router();

router.get("/", getAllPost);
router.post("/", createPost);
router.get("/categories", getAllCategories);
router.get("/qod", getRandomPost )
router.get("/:id", getSinglePost)

router.get("/categories/:category", getPostsByCategory);

module.exports = router;
