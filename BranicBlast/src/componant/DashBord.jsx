import React from 'react'
import './DashBord.css'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
export default function DashBord() {
  const { logout , isAuthenticated  , loginWithRedirect , user} = useAuth0();


  return (
    <>
   <div className="container">
    <h1 >DashBoard</h1>
    <center>{isAuthenticated ? <h2>Welcome {user.name}</h2> : <h2>Welcome Guest</h2>}
    </center>
    <div className="btn">
{ isAuthenticated ? <Link style={{color:'white' , textDecoration:'none'}} to={'/create'}><button className='bt'>
  Create
</button> </Link> : null}
<Link style={{color:'white' , textDecoration:'none'}} to={'/join'}><button className='bt'>
 Join
</button> </Link>


    
</div>
{isAuthenticated ? <button onClick={() => logout()}>Logout</button> : <button onClick={() => loginWithRedirect()}>Login</button>}

</div>
  </>   
   
  )
}
