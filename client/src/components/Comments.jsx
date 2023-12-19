import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from './Footer'

export default function Comments({videoId,channel}) {

const { currentUser } = useSelector((state) => state.user)
const [comments,setComments] = useState([])

useEffect(() => {
   const fetchComments = async () => {
      try {
          const res = await axios.get(`/api/v1/comment/${videoId}`)
          setComments(res.data)
      } catch (error) {
          
      }
  }
  fetchComments()
},[videoId])

  return (
    <>

    {
      comments.map(comment => (
<div className='w-full h-auto bg-gary-800 flex flex-col mb-5' key={comment._id}>
      <div className='flex md:gap-2 gap-1'>
      <img src='pbj.png' className="w-6 h-6 rounded-full cursor-pointer"/>
      <span className='font-bold'>{channel.name}</span>
      </div>
       <div className='ml-12 -mt-6'>
            <p>{comment.desc}</p>
       </div>
      </div>
      ))
    }
      <Footer/>
    </>
  )
}
