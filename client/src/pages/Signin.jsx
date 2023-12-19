import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Wrapper from './Wrapper'
import toast from 'react-hot-toast'
import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";


const defaultData = {
  email:'',
  password:''
} 

export default function Signin() {
  const [user,setUser] = useState(defaultData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    dispatch(loginStart())
    try {
      const {data} = await axios.post('/api/v1/auth/signin', user)
      if (data.error) {
        toast.error("Wrong Credential!",data.error)
      } else {
        navigate('/')
        dispatch(loginSuccess(data))
        toast.success(data.success)
      }
 } catch (error) {
  toast.error("Wrong Credential!")
  dispatch(loginFailure())
 }
  }


  return (
    <Wrapper>
      <div className='w-full h-screen flex justify-center items-center'>
        <form className='w-96 h-80 flex flex-col items-center p-8 bg-sky-900 rounded-md'>
          <p className='text-3xl mb-4 font-semibold'>Login</p>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Email' name='email' onChange={handleChange}/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Password' name='password' onChange={handleChange}/>
          <button
          className='w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white'
          onClick={handleSubmit}>Login</button>
          <p className='mt-3 text-white -ml-20'>Dont have an account <Link to='/signup'><span className='text-blue-400'>Sign Up</span></Link></p>
        </form>
      </div>
      </Wrapper>
  )
}
