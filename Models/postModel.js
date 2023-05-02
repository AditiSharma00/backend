const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    device:{
        type:String,
        enum:["Pc","Mobile","Tablet"],
    }
})
const Post=mongoose.model("Post",postSchema)
module.exports={Post}