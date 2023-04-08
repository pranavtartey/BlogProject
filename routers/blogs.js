const {getBlogs,createBlog,viewBlog,updateBlog,deleteBlog} = require("../controllers/blog");
const express = require("express");
const Router = express.Router();

Router.route("/")
    .get(getBlogs)
    .post(createBlog);    

Router.route("/:id")
    .get(viewBlog)
    .post(updateBlog)
    .delete(deleteBlog);
module.exports = Router;