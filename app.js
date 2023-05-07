require("dotenv").config();
const mongoose = require("mongoose");
const blogRoutes = require("./routers/blogs");
const commentRoutes = require("./routers/comments");
const userRoutes = require("./routers/user");
const express = require("express");
const app = express();
const connect = require("./db/connection");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/user");

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DBURL;

const sessionConfig = {
    secret : "thisismysecret",
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}

const connectDb = async() => {
    await connect(dbUrl);
}


connectDb();
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected");
})


app.use(express.urlencoded({extended : true}));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/blogs",blogRoutes);
app.use("/blogs/:blogid/comments",commentRoutes);
app.use("/blogs/user",userRoutes);


app.use((err,req,res,next) => {
    const { statusCode = 500 } = err;
    if(!err.message){err.message = " aww snap! something went wrong"};
    console.log(err.message);
    res.status(statusCode).render("error", {err});
})

console.log(PORT);
app.listen(PORT,(PORT)=>{
    console.log(`We are connected to Port ${PORT}`)
})