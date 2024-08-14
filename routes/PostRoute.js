const express = require("express");
const {
  getAllCategories,
  getAllQuotes,
  createQuote,
  getSingleQuote,
  getQuotesByCategory,
  getQuoteOfTheDay,
} = require("../controllers/PostController");
const router = express.Router();

router.get("/", getAllQuotes);
router.post("/", createQuote);
router.get("/categories", getAllCategories);
router.get("/qod", getQuoteOfTheDay);
router.get("/:id", getSingleQuote);

router.get("/categories/:category", getQuotesByCategory);

module.exports = router;
