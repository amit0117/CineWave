import logo from './logo.svg'
import './App.css'
import Movies from './Components/Movies'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Favourites from './Components/Favourites'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
    {/* ROUTING IN WESITES */}

      <BrowserRouter>
        <Navbar />
        <Banner/> 
   
         
      
        <Routes>
          <Route path="/" element={<Movies/>} />
          <Route path="/favourites" element={<Favourites/>} />
        </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App
