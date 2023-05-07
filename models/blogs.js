const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    Author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    CreatedAt : {
        type : Date,
        default : Date.now()
    },
    Blog : {
        type : String,
        required : true
    },
    Comments : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }
]
})

module.exports = mongoose.model("Blog",BlogSchema);