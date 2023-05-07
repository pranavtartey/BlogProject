const User = require("../models/user");

module.exports.registerUser = async (req, res, next) => {
    try{
        const {username,password,email} = req.body;
        const user = new User({username,email});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser, function(err) {
            if(err){return next(err)}
            res.redirect("/blogs");
        });
        
        //passport.authenticate also calls the req.login() function and req.login() is basically used to login the newly registered user.
        console.log(req.user);
        res.status(200).json(registeredUser);
    }catch(err) {
        console.log("error", err.message);
        res.redirect("/blogs");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.status(404).send("This is your login form. Hit the post route on /blogs/user/login with username and password to login")
}

module.exports.login = (req,res) => {
    console.log(req.user);
    res.redirect("/blogs");
}

module.exports.logout = (req,res) => {
    req.logout(err => {
        if(err) {return next(err)}
        res.status(200).send("You have been logged out successfully");
    });
    res.status(200).send("user has been loged out successfully");
}