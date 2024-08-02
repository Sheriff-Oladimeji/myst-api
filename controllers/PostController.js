const Post = require("../models/Post.model")


const getAllPost = async (req, res) => {
    try {
        const posts = Post.find()
        res.status(200).json({status: "Success", posts})
        
    } catch (error) {
        throw error
    }
}



module.exports = {getAllPost}