const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    Body : {
        type : String,
    },
    Author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

module.exports = model("Comment",commentSchema)