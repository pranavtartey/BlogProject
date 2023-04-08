require("dotenv").config();
const mongoose = require("mongoose");
const blogRoute = require("./routers/blogs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DBURL;
const connect = require("./db/connection");
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

app.use("/blogs",blogRoute);


console.log(PORT);
app.listen(PORT,(PORT)=>{
    console.log(`We are connected to Port ${PORT}`)
})