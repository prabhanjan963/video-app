import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

import Comment from "../components/Comment"
import Comments from "../components/Comments"
import Footer from "../components/Footer"
import Menu from "../components/Menu"
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike, BiShare, BiSave } from "react-icons/bi";
import { format } from 'timeago.js'
import { like, dislike, fetchSuccess } from "../redux/videoSlice"


export default function Video() {
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  const [photo, setPhoto] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch()
  //one api
  useEffect(() => {
    const res = async () => {
      const response = await axios.get(`/api/v1/video/find/${id}`)
      setPhoto(response.data)
      dispatch(fetchSuccess(response.data))
    }
    res()
  }, [])

  const handleLike = async () => {
    try {
      const { data } = await axios.put(`http://localhost:8000/api/v1/user/like/${currentVideo._id}`)
      dispatch(like(currentUser._id))
      if (data.error) {
      } else {
        dispatch(like(currentUser._id))
      }
    } catch (error) {

    }
    // await axios.put(`/api/v1/user/like/${currentVideo._id}`)
    // dispatch(like(currentUser._id))
  }

  const handledisLike = async () => {
    await axios.put(`http://localhost:8000/api/v1/user/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

const videoRef = useRef(null);

const handleTimeUpdate = async () => {
  const video = videoRef.current;
  const currentTime = video.currentTime;
  const duration = video.duration;

  const percentageWatched = (currentTime/duration) * 100;

  if(percentageWatched >= 30 && percentageWatched < 31){
    const updateView = await axios.put(`http://localhost:8000/api/v1/video/view/${currentVideo._id}`)
  }
}

  return (

    <>
      <div className='flex w-full h-full fixed mb-24 items-center overflow-y-auto'>
        <div>
          <Menu />
        </div>
        <div className="w-full h-full bg-gray-800 md:pl-24 md:pr-24 md:pt-6 overflow-x-hidden text-white overflow-y-scroll">

          <div className="p-4 md:flex-col flex-col flex md:hidden">
            <span className="text-2xl md:hidden">{photo.title}</span>
            <span>{photo.views-1} views . {format(photo.createdAt)}</span>
          </div>
          <video ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
          src={`http://localhost:8000/backend/uploades/${photo.videoUrl}`} type="video/*"
            className='md:w-full md:h-[550px] h-64 w-full bg-gray-800 cursor-pointer'
            controls
          >
          </video>
          <div className="w-full bg-gray-800 flex justify-between m-auto h-24 md:flex">
            <div className="md:p-5 md:flex md:flex-col flex-col hidden">
              <span className="md:text-2xl md:flex hidden">{photo.title}</span>
              <span>{photo.views-1}views . {format(photo.createdAt)}</span>
            </div>
            <div className="w-2/4 p-5 flex justify-end">
              <ul className="md:gap-5 md:flex md:-mr-0 cursor-pointer flex gap-14 -mr-44">




                {!currentUser ? <Link to='/signin' className="mt-4"><BiLike className='md:text-3xl text-2xl' /></Link> :
                  <button onClick={handleLike}>{!currentVideo.likes?.includes(currentUser._id) ?
                    <BiLike className='md:text-3xl text-2xl' /> : <BiSolidLike className='md:text-3xl text-2xl' />}
                  </button>} <span className='mt-5 md:-ml-4 -ml-12'>{currentVideo.likes?.length}</span>




                {
                  !currentUser ? <Link to='/signin' className="mt-5"><BiDislike className='md:text-3xl text-2xl' /></Link> : <button onClick={handledisLike}>
                    {!currentVideo.dislikes?.includes(currentUser._id) ?
                      <BiDislike className='md:text-3xl text-2xl' /> :
                      <BiSolidDislike className='md:text-3xl text-2xl' />}
                  </button>
                }
                <span className='mt-5 md:-ml-4 -ml-12'>{currentVideo.dislikes?.length}</span>

                {/* <button><ReplyOutlinedIcon /></button>
                <button><AddTaskOutlinedIcon /></button> */}

              </ul>
            </div>
          </div>

          <div className="w-full flex justify-between mb-5">
            <div className="flex flex-col">
              <img src="/pbj.png" className="w-7 h-7 rounded-full cursor-pointer" />
              <span className="-mt-7 ml-10">{photo.title}</span>

            </div>
          </div>

          <Comment videoId={currentVideo._id} />
          <Comments videoId={currentVideo._id} channel={photo} />
          <Footer />
        </div>

      </div>
    </>
  )
}
