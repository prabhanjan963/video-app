import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const signup = async (req,res) => {
    const { name,email,password } = req.body;
    try {
        if(!name ||!email ||!password) return res.status(400).json({error: 'Fill all details'})
        if(!email.includes('@')) return res.status(400).json({error: 'Enter Valid Email!'})
        
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = await User({...req.body, password:hashedPassword})
        await newUser.save()
        res.status(201).send({success:"Registration Successfully"})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        if(!email ||!password) return res.status(400).json({error: 'Fill all details'})
        if(!email.includes('@')) return res.status(400).json({error: 'Enter Valid Email!'})

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error:"User Not Found!"})

        const isCorrect = bcryptjs.compareSync(password, user.password)
        if(!isCorrect) return res.status(404).json({error:"Wrong Credentials!"})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        const { password:hashedPassword,...rest } = user._doc;

        res.cookie('access_token',token,process.env.JWT_SECRET).status(200).json(rest)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
