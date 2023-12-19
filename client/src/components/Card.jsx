import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { format } from 'timeago.js'

export default function Card() {
  const [photos,setPhotos] = useState([])

  useEffect(() => {
    const response = async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/video`)
      setPhotos(res.data)
      
    }
    response()
  },[])
  //all vide api
  return (
    <>
      
      {
        
        photos.map(({title,desc,videoUrl,_id,createdAt,views}) => (
          <Link to={`/video/${_id}`} key={_id}>
            
        <div className="flex flex-col md:w-96 text-white md:p-5 h-80 cursor-pointer md:mb-10 -mb-6 w-full">
        <iframe src={`http://localhost:8000/uploades/${videoUrl}`} alt="video/" 
        className="md:w-96 bg-slate-400 md:h-52 h-80 bg-contain w-full">
            
        </iframe>
        <div className="flex flex-col items-start md:h-0 text-white">
            <div className="flex gap-2">
            <img src='pbj.png' className="w-6 h-6 rounded-full bg-slate-500 mt-3"/>
            <span className="mt-3 font-semibold text-[17px] flex flex-wrap
             md:mb-0 
            ">{title}</span>
            </div>
            <div className="flex md:flex-col ml-8">
            <span className='md:top-0 md:font-normal font-semibold mt-1 md:mb-0 mb-10 text-white'>
              {desc}</span>
            <span className='flex md:flex-col md:ml-3 ml-36 md:-mt-0 -mt-8 text-[16px] text-white'>
              {views}
             views {format(createdAt)}</span>
            </div>
        </div>
      </div>
      </Link>
      )
      )}
   
    </>
  )
}
