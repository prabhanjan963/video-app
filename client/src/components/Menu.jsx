import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";


export default function Menu() {
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <>
            <nav className="md:h-screen bg-gray-800 text-white text-2xl w-56 md:block hidden">
                <ul className="flex flex-col">
                    
                    <Link to='/'><li className="flex ml-6 p-2">Home</li></Link>
                    <Link to='/trend'><li className="flex ml-6 p-2">Trend</li></Link>
                    <hr></hr>
                    {!currentUser ? <Link to='/signin'><li className="flex ml-6 p-2">Signin</li></Link> : 
                    <button className="flex ml-6 p-2" onClick={()=>dispatch(logout()) && navigate('/')}>Logout</button>
                    }
                    
                    <hr></hr>
                    
                    <Link to='/upload'><li className="flex ml-6 p-2">Upload</li></Link>
                    
                </ul>
            </nav>
        </>
    )
}
