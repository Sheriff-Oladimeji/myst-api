const Post = require("../models/Post.model")



const getAllPost = async (req, res) => {
    try {
        const posts = Post.find()
        res.status(200).json({status: "Success", posts})
        
    } catch (error) {
        throw error
    }
}

const createPost = async (req, res) => {
    try {
        const { quote, author } = req.body
        if (quote && author) {
            const post = await Post.create({ quote, author })
            await post.save()
            res.send("Post Created successfully")
        }
        else {
            res.send("Please add a quote and an author")
        }
    } catch (error) {
        throw error
    }
}


module.exports = {getAllPost, createPost}