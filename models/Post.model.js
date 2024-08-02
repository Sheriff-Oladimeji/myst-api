const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    body: String,
    upVote: Number,
    author: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post