import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
     < div  style={{display:'flex',backgroundColor:"#cacccf",padding:'.2rem',color:"white"}}>
       <Link to="/"style={{textDecoration:"none"}}><h1 >CineWave</h1></Link>
     <Link to="/favourites" style={{textDecoration:"none"}}><h5 style={{marginTop:'20px',marginLeft:"15px"}}>Favourites</h5>
    </Link>
     </div>
    )
  }
}
