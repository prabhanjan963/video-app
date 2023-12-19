import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import commentRoutes from './routes/comment.js'
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import path from 'path'

dotenv.config()
const __dirname = path.resolve();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname,"./client/dist")))

// app.get('*',(req,res) => {
//     res.sendFile(path.join(__dirname,"./client/dist/index.html"))
// })

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))


//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/comment', commentRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/video', videoRoutes)

//database connection

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Database Connection Successfully')
}).catch((e) => {
    console.log('Error While Connecting Database',e)
})


app.listen(PORT, () => {
    console.log('Server Is Running On PORT',PORT)
})
