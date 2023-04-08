const mongoose = require("mongoose");
const connectDb = (dbUrl)=> {
    return mongoose.connect(dbUrl,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    // const db = mongoose.connection;
    // db.on("error", console.error.bind(console,"connsection error"));
    // db.once("open",()=>{
    //     console.log("Database connected");
    // })
}

module.exports = connectDb;