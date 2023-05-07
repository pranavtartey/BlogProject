const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const seedData = require("./seedblogs.json");
const db = mongoose.connection;


const start = async() => {
    try{
        mongoose.connect("mongodb://localhost:27017/blogproject",{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

    db.on("error",console.error.bind(console,"connection error"));
    db.once("open",()=>{
    console.log("DataBase connected");
    })
        await Blog.deleteMany();
        // await Blog.create(seedData);
        console.log("success");
    }catch(error) {
        console.log(error);
    }
}
start().then(() => {
    mongoose.connection.close();
});