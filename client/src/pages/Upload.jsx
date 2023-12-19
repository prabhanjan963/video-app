import { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Wrapper from "./Wrapper"


export default function Upload() {
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [videoUrl,setVideoUrl] = useState('')

  const [progress,setProgress] = useState({started: false, pc:0})

  const navigate = useNavigate()

  //upload api
  const handleUpload = (e) => {
    e.preventDefault()
    if(!title ||!desc ||!videoUrl ) return alert('All Fields Are Required!')
    
      const formData = new FormData()
      formData.append('title', title)
      formData.append('desc', desc)
      formData.append('videoUrl', videoUrl)

      setProgress(prevState => {
        return {...prevState, started:true}
      })

    try {
      axios.post(`/api/v1/video/upload`,formData ,{
        onUploadProgress: (progressEvent) => {
          setProgress(prevState => {
            return {...prevState, pc: progressEvent.progress * 100}
            
          })
        }
        
      })
      
    } catch (error) {
      console.log("Upload",error)
    }
  }
  
  return (
    <>
      <Wrapper>
      <div className='w-full h-screen flex justify-center items-center'>
        <form className='w-96 h-[400px] flex flex-col items-center p-8 bg-sky-900 rounded-md text-black'>
          <p className='text-3xl mb-4 font-semibold'>Upload a New Video</p>
          <div>
            <input
              className='w-[40vh] border-b-2 rounded-full mt-3 p-1 outline-none'
              type="text" placeholder='Title' name="title" onChange={e=>setTitle(e.target.value)} />
            <input
              className='w-[40vh] border-b-2 rounded-full mt-3 p-1 outline-none'
              type="text" placeholder='Description'name="desc" onChange={e=>setDesc(e.target.value)} />

          </div>

          {/* ******************************* */}
          <div>
            <span>Video:</span>

            <input type="file" name="videoUrl" accept="video/*"
              className='w-full  rounded-full mt-3 p-1 outline-none'
               onChange={e=>setVideoUrl(e.target.files[0])} />
          </div>
          <button
            className='w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white'
            onClick={handleUpload}>Upload</button>

            {
              progress.started && <progress max='100' value={progress.pc} 
              className="w-56 h-3 mt-10 rounded-full block"></progress>
            }
        </form>
      </div>
    </Wrapper>














    </>
  )
}
