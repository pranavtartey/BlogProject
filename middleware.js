const Blog = require("./models/blogs");
const Comment = require("./models/comments");


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/blogs/user/login")
    }
    next();
}

module.exports.isAuthor = async(req,res,next) => {
    const { commentid } = req.params;
    const comment = await Comment.findById(commentid);
    if(!comment.Author.equals(req.user._id)){
        res.send("You do not have the permission to do that");
    }
    next();
}

module.exports.isCreator = async(req,res,next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if(!blog.Author.equals(req.user._id)){
        res.send("You do not have the permission to do that");
        return res.redirect(`/blogs/${id}`)
    }
    next();
}