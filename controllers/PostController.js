const Post = require("../models/Post.model");


const getAllQuotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createQuote = async (req, res) => {
  try {
    const { quote, author, category } = req.body;
    if (quote && author) {
      const existingQuote = await Post.findOne({
        quote: { $regex: new RegExp(`^${quote}$`, "i") },
      });

      if (existingQuote) {
        return res
          .status(409)
          .json({ message: "This quote already exists in the database." });
      }

      const post = await Post.create({ quote, author, category });
      await post.save();
    
      
      res.status(201).json({ message: "Quote created successfully" });
    } else {
      res.status(400).json({ message: "Please add a quote and an author" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categoryCounts = await Post.aggregate([
      { $group: { _id: { $toLower: "$category" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    console.log(`categories : ${categoryCounts.length}`);
    res.json(categoryCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Post.aggregate([
      { $group: { _id: { $toLower: "$author" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getQuotesByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({
      category: { $regex: new RegExp("^" + category + "$", "i") },
    });
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find({
      category: { $regex: new RegExp("^" + category + "$", "i") },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (posts.length > 0) {
      res.json({
        posts,
        currentPage: page,
        totalPages,
        totalPosts,
      });
    } else {
      res.status(404).send("No posts found for this category");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAuthorQuotes = async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({
      author: { $regex: new RegExp("^" + author + "$", "i") },
    });
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find({
      author: { $regex: new RegExp("^" + author + "$", "i") },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (posts.length > 0) {
      res.json({
        posts,
        currentPage: page,
        totalPages,
        totalPosts,
      });
    } else {
      res.status(404).send("No posts found for this author");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const searchQuotes = async (req, res) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(q, "i");

    const totalPosts = await Post.countDocuments({
      $or: [
        { quote: searchRegex },
        { author: searchRegex },
        { category: searchRegex },
      ],
    });

    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find({
      $or: [
        { quote: searchRegex },
        { author: searchRegex },
        { category: searchRegex },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

let quoteOfTheDay = null;
let lastUpdated = null;

const getQuoteOfTheDay = async (req, res) => {
  try {
    const now = new Date();
    const categories = [
      "inspirational",
      "motivational",
      "freedom",
      "wisdom",
      "religion",
      "love",
    ];

    if (
      !quoteOfTheDay ||
      !lastUpdated ||
      now - lastUpdated >= 24 * 60 * 60 * 1000
    ) {
      const count = await Post.countDocuments({
        category: { $regex: new RegExp(categories.join("|"), "i") },
      });

      if (count === 0) {
        return res
          .status(404)
          .send("No posts found in the specified categories");
      }

      const randomIndex = Math.floor(Math.random() * count);
      quoteOfTheDay = await Post.findOne({
        category: { $regex: new RegExp(categories.join("|"), "i") },
      }).skip(randomIndex);

      lastUpdated = now;
    }

    res.json(quoteOfTheDay);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getSingleQuote = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("Unable to find post");
  }
};

module.exports = {
  getAllQuotes,
  createQuote,
  getSingleQuote,
  getQuoteOfTheDay,
  getAllCategories,
  getQuotesByCategory,
  getAllAuthors,
  getAuthorQuotes,
  searchQuotes
};
