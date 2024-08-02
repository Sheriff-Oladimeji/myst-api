const express = require("express")
const { getAllPost, createPost } = require("../controllers/PostController")
const router = express.Router()

router.get("/", getAllPost)
router.post("/", createPost )

module.exports = router