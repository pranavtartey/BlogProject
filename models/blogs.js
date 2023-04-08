const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    Author: {
        type : String,
        required : true,
    },
    CreatedAt : {
        type : Date,
        default : Date.now()
    },
    Blog : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Blog",BlogSchema);