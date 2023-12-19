import User from '../models/user.js'
import Video from '../models/video.js'

export const updateUser = async (req,res) => {
    if(req.params.id === req.user.id)
   try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
         $set:req.body
      },{new:true})
      res.status(200).json(updatedUser)
   }catch(err){
      res.status(400).json(err.message)
   }
}

export const deleteUser = async (req,res) => {
    if(req.params.id === req.user.id)
   try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({success: 'User has been deleted'})
   }catch(err){
      res.status(400).json(err.message)
   }
}

export const getUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user) 
    }catch(error){
        res.status(500).json(error.message)
    }
}

export const like = async (req,res) => {
   const id = req.user.id;
   const videoId = req.params.videoId;
   try{
      await Video.findByIdAndUpdate(videoId,{
         $addToSet:{ likes:id },
         $pull:{ dislikes:id }
      })
      res.status(200).json("The video has been liked")
   }catch(err){
      res.status(400).json(err.message)
   }
}

export const disLike = async (req,res) => {
    const id = req.user.id;
   const videoId = req.params.videoId;
   try{
      await Video.findByIdAndUpdate(videoId,{
         $addToSet:{ dislikes:id },
         $pull:{ likes:id }
      })
      res.status(200).json("The video has been disliked")
   }catch(err){
      res.status(400).json(err.message)
   }
}
