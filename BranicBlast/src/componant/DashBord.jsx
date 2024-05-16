import React from 'react'
import './DashBord.css'
import { Link } from 'react-router-dom'
export default function DashBord() {
  return (
    <>
   <div className="container">
    <h1 >DashBoard</h1>
    <div className="btn">

<button className='bt'>
<Link style={{color:'white' , textDecoration:'none'}} to={'/create'}> Create </Link>
</button>
<button classname ='bt'><Link style={{color:'white' , textDecoration: "none"}} to={'/join'}> Join</Link></button>

    
</div>
</div>
  </>   
   
  )
}
