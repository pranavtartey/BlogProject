const {getBlogs,createBlog,viewBlog,updateBlog,deleteBlog, renderNewForm } = require("../controllers/blog");
const express = require("express");
const Router = express.Router();
const { isLoggedIn, isCreator } = require("../middleware");

Router.route("/").get(getBlogs);

Router.route("/new")
    .get(renderNewForm)
    .post(isLoggedIn, createBlog);    

Router.route("/:id")
    .get(viewBlog)
    .post(isLoggedIn, isCreator, updateBlog)
    .delete(isLoggedIn, isCreator, deleteBlog);


module.exports = Router;