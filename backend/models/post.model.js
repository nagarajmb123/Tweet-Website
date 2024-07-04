const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        unique:true,
        required : true
    },
    age:{
        type:Number,

    },
    tweetmsg:{
        type:String,
        required:true
    }

},
{timestamps:true}
);

const Post = mongoose.model('Post',postSchema)

module.exports = Post;

