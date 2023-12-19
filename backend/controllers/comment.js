import Comment from '../models/comment.js'
import Video from '../models/video.js'

export const addComment = async (req,res) => {
    try {
        const userId = req.user.id
        const newComment = new Comment({...req.body,userId})
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const deleteComment = async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)

        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
        }else{
            res.status(403).json("you can delete only your comment")
        }
        res.status(200).json("The comment has been deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getComment = async (req,res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error.message)
    }
}