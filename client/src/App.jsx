import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import Card from './components/Card'
import Upload from './pages/Upload'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Like from './pages/Like'


export default function App() {
  return (
    <>
    <Toaster />
        <Navbar />
      <Routes>
        <Route path='/' element={<Home type='random'/>}/>
        <Route path='/trends' element={<Home type='trends'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/card' element={<Card/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/video/:id' element={<Video/>}/>
        <Route path='/like' element={<Like/>}/>
      </Routes>
    </>
  )
}
