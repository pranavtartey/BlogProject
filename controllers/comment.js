const Comment = require("../models/comments");
const Blog = require("../models/blogs");

module.exports.createComment = async(req,res) => {
    const blog = await Blog.findById(req.params.blogid);
    console.log(req.body);
    const comment  = new Comment(req.body);
    comment.Author = req.user._id;
    //In req.user the user is the property added for us by passport
    blog.Comments.push(comment);
    await blog.save();
    await comment.save().then(() => {
        console.log("This comment has been saved to the database");
    });
    res.redirect(`/blogs/${req.params.blogid}`)
}

module.exports.deleteComment = async(req,res) => {
    const { blogid, commentid } = req.params;
    console.log(blogid,commentid);
    await Blog.findByIdAndUpdate(blogid,{$pull :{ Comments : commentid}});
    await Comment.findByIdAndDelete(commentid);
    console.log("Comment was deleted successfully");
    res.redirect(`/blogs/${blogid}`);
}