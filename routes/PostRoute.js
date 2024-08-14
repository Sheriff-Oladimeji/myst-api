const express = require("express");
const {
  getAllCategories,
  getAllQuotes,
  createQuote,
  getSingleQuote,
  getQuotesByCategory,
  getQuoteOfTheDay,
  getAllAuthors,
  getAuthorQuotes,
} = require("../controllers/PostController");
const router = express.Router();

router.get("/", getAllQuotes);
router.post("/", createQuote);
router.get("/categories", getAllCategories);
router.get("/authors", getAllAuthors);
router.get("/qod", getQuoteOfTheDay);
router.get("/:id", getSingleQuote);
router.get("/categories/:category", getQuotesByCategory);
router.get("/authors/:author", getAuthorQuotes);

module.exports = router;
