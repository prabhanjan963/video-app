import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function PhoneNav() {
  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  return (
    <>
      <nav className="bg-gray-800 text-white text-[20px] 
     md:hidden ml-60 w-44 z-10 fixed rounded-md mt-3">
        <ul className="flex flex-col">
        <Link to='/trend'><li className="flex ml-6 p-2">Trend</li></Link>
          <hr></hr>
          {!currentUser ? <Link to='/signin'><li className="flex ml-6 p-2">Signin</li></Link> : 
          <button className="flex ml-6 p-2" onClick={()=>dispatch(logout())}>Logout</button>}
          <hr></hr>
          <Link to='/upload'><li className="flex ml-6 p-2">Upload</li></Link>
        </ul>
      </nav>
    </>
  )
}
