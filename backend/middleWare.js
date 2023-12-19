import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, './public/uploades')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadMiddleware = multer({ storage })

export default uploadMiddleware;