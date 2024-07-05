

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String // Store the URL/path of the uploaded photo
  },
  tweetmsg: {
    type: String
  }
});

module.exports = mongoose.model('Post', postSchema);


/*
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
*/