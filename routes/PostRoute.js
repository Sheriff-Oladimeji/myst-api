const express = require("express")
const { getAllPost } = require("../controllers/PostController")
const router = express.Router()

router.get("/", getAllPost)

module.exports = router