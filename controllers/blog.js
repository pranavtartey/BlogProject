const Blog = require("../models/blogs");

module.exports.getBlogs = async(req,res) => {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
}

module.exports.renderNewForm = ()=> {
    res.status(404).send("This is your new form");
}

module.exports.createBlog = async(req, res) => {
    const blog = new Blog(req.body);
    blog.Author = req.user._id;
    await blog.save().then(() => {
        console.log("Blog saved successfully")
    })
    res.redirect(`/blogs/${blog._id}`);
}

module.exports.viewBlog = async(req,res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("Comments");
    res.status(200).json(blog);
}

module.exports.updateBlog = async(req,res) => {
    const { id } = req.params;
    console.log(req.body);
    const updatedBlog = await Blog.findByIdAndUpdate(id,{...req.body});
    await Blog.save().then(() => {
        console.log("Blog updated successfully");
    })
    console.log(updatedBlog);
    res.redirect(`/blogs/${id}`);
}

module.exports.deleteBlog = async(req,res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    console.log("Blog deleted successfully")
    res.redirect('/blogs');
}