import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    // userId:{
    //     type:String,
    //     required:true
    // },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
    views:{
        type:Number,
        default:0
    },
},{timestamps:true})

const Video = mongoose.model('Video', videoSchema)

export default Video;