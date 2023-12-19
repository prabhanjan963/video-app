import express from 'express'
import { updateUser, deleteUser,getUser,like,disLike} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';
const routes = express.Router()

routes.put('/:id',verifyToken,updateUser)
routes.delete('/:id', verifyToken ,deleteUser)
routes.get('/:id',getUser)
routes.put('/like/:videoId', verifyToken ,like)
routes.put('/dislike/:videoId', verifyToken ,disLike)

export default routes;