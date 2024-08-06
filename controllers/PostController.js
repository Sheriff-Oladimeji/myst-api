const Post = require("../models/Post.model");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createPost = async (req, res) => {
  try {
    const { quote, author, tags, image, category } = req.body;
    if (quote && author) {
      const post = await Post.create({ quote, author, tags, image, category });
      await post.save();
      res.json({ message: "Post Created successfully" }); 
    } else {
      res.json({message:"Please add a quote and an author" })
    }
  } catch (error) {
     console.error(error);
     res.status(500).send("Internal Server Error");
  }
};
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } 

  } catch (error) {
    console.error(error);
    res.status(404).send("Couldn't find post");
  }
};

module.exports = { getAllPost, createPost , getSinglePost};
