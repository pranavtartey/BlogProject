const express = require("express");
const {createComment, deleteComment} = require("../controllers/comment");
const Router = express.Router({mergeParams : true});
const { isLoggedIn, isAuthor } = require("../middleware");

Router.route("/new").post( isLoggedIn, isAuthor, createComment);
Router.route("/:commentid").delete( isLoggedIn, isAuthor, deleteComment);
    
module.exports = Router;