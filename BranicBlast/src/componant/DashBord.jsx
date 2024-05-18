import React from 'react'
import './DashBord.css'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
export default function DashBord() {
  const { logout , isAuthenticated  , loginWithRedirect} = useAuth0();


  return (
    <>
   <div className="container">
    <h1 >DashBoard</h1>
    <div className="btn">

<button className='bt'>
<Link style={{color:'white' , textDecoration:'none'}} to={'/create'}> Create </Link>
</button>
<button classname ='bt'><Link style={{color:'white' , textDecoration: "none"}} to={'/quize'}> Join</Link></button>

    
</div>
{isAuthenticated ? <button onClick={() => logout()}>Logout</button> : <button onClick={() => loginWithRedirect()}>Login</button>}

</div>
  </>   
   
  )
}
