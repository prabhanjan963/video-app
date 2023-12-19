import axios from 'axios'
import { useEffect, useState } from 'react'
export default function Comment({videoId}) {
  const testId = videoId;
const defaultData = {
  desc:'',
  videoId:testId
}

const [comment,setComment] = useState(defaultData)
const [comments,setComments] = useState([])

  const handleComment = (e) => {
    setComment({...comment,[e.target.name]:e.target.value})
  }

  const sendComment = async (e) => {
    try {
        await axios.post(`http://localhost:8000/api/v1/comment`,comment)
        
    } catch (error) {
        
    }
    
}

useEffect(() => {
  const fetchComments = async () => {
     try {
         const res = await axios.get(`http://localhost:8000/api/comment/${videoId}`)
         setComments(res.data)
     } catch (error) {
         
     }
 }
 fetchComments()
},[videoId])

  

  return (
    <>
      <div className="flex h-24">
      <img src="/pbj.png" className="w-7 h-7 rounded-full cursor-pointer"/>
      <input type="search" placeholder="Add a Comment..." className="w-full h-20 bg-gray-800
       border-b-2 border-white outline-none md:w-full md:p-2" name='desc' onChange={handleComment}/>
       <button onClick={sendComment}>send</button>
      </div>
    </>
  )
}
