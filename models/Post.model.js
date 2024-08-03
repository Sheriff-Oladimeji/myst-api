const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    upVote: { type: Number, default: 0 },
    author: { type: String, required: true },
    image: String,
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
