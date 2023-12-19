import Video from "../models/video.js";


// **************************** Image ***************************

// **************************** Image ***************************

export const upload = async (req,res) => {
    const formData = {
        title: req.body.title,
        desc: req.body.desc,
        videoUrl: req.file.filename
    }
    try {
        const saved = await Video.create(formData)
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const allVideo = async (req,res) => {
    try {
        const video = await Video.find()
        res.status(200).json(video)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const oneVideo = async (req,res) => {
    try {
        const allGet = await Video.findById(req.params.id)
        allGet.views++
        res.status(200).json(allGet)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const myVideo = async (req,res) => {
    try {
        const video = await Video.find({userId: req.user.id})
        res.status(200).json(video)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const updateVideo = async (req,res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) res.status(404).json("Video not found!")
        if(req.user.id === video.userId){
            const updatedUser = await Video.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            },{new:true})
            res.status(200).json(updatedUser)
        }else{
            res.status(403).json("You can update only video!")
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const deleteVideo = async (req,res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) res.status(404).json("Video not found!")
        if(req.user.id === video.userId){
             await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("Video has been delated")
        }else{
            res.status(403).json("You can delete only video!")
        }
        res.status(200).json("Video has been delated")
    } catch (error) {
        res.status(400).json(error.message) 
    }
}

export const addView = async (req,res) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        })
        res.status(200).json({success:"the view has been increment"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const random = async (req,res) => {
    try {
        const videos = await Video.aggregate([{$sample:{size: 40}}])
        res.status(200).send(videos)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const trend = async (req,res) => {
    try {
        const video = await Video.find().sort({views:-1});
        res.status(200).json(video)
    } catch (error) {
        res.status(400).json(error.message)
    }
}