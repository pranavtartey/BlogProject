const express = require("express");
const passport = require("passport");
const Router = express.Router();
const { registerUser, login, renderLoginForm, logout } = require("../controllers/user");

Router.route("/register").post(registerUser);

Router.route("/login").get(renderLoginForm);

Router.route("/login").post(passport.authenticate("local",{failureFlash : true, failureRedirect : "/blogs/user/login",keepSessionInfo : true}), login);

Router.route("/logout").post(logout);

module.exports = Router;