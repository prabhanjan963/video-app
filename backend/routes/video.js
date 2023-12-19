import express from 'express'
import middle from '../middleWare.js'
import { upload, allVideo, oneVideo
     , addView, deleteVideo, myVideo, random, trend, updateVideo} from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const routes = express.Router()

routes.post('/upload',middle.single('videoUrl'), upload)
routes.get('/', allVideo)
routes.get('/find/:id', oneVideo)

routes.put('/:id',verifyToken,updateVideo)
routes.delete('/:id',verifyToken,deleteVideo)
routes.put('/view/:id',addView)
routes.get('/trend',trend)
routes.get('/random',random)
routes.get('/myvideo', verifyToken, myVideo)


export default routes;
