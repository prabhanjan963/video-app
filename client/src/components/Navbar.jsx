import { useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom'
import PhoneNav from "./PhoneNav";
import Menu from "./Menu";

export default function Navbar() {
    
  const [nav,setNav] = useState(false)
  const [searchOpen,setSearchopen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
     <nav className="w-full md:p-4 flex items-center text-white text-1xl
     font-bold justify-between sticky bg-slate-700 
     ">
        <div className="md:text-2xl cursor-pointer md:pl-3 md:pt-0 pt-4 pl-5 pb-4 text-2xl">
            <span className="hover:text-teal-500 md:text-red-500 text-red-600">PBJ</span>
            <span className="hover:text-slate-500 md:text-green-500 text-green-600">Video</span>
            <span className="hover:text-orange-600 md:text-yellow-500 text-yellow-600 mr-1">.app</span>
        </div>
        <ul className="md:block hidden">
            <li className="md:flex cursor-pointer">
                <input type="search" placeholder="Search" className="border-2 rounded-md bg-transparent w-[500px]"/>
            </li>
        </ul>
        <div className="flex justify-center items-center text-3xl gap-5">
          <BiSearch className="md:hidden" onClick={()=>{setSearchopen(!searchOpen) || setNav(false)}}/>
          <Link to='/upload'>
          <img src="pbj.png" className="w-7 h-7 rounded-full cursor-pointer md:flex"/>
          </Link>
          <BiMenu className="mr-4 md:hidden" onClick={() => {setNav(!nav) || setSearchopen(false)}}/>
        </div>
        
     </nav>
     
     { 
      searchOpen && <input type="search" placeholder="Search" className="
      border-2 rounded-md ml-12 p-2 text-red-500 text-[18px]
      bg-gray-700 
      w-[300px] z-10 fixed"/>
     }
      {
          nav && <PhoneNav />
      }
    </>
  )
}
