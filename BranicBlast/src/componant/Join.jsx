import axios, { Axios } from 'axios';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
export default function Join() {
  
  const [code, setCode] = useState();
const [encode , setencode] = useState(); 
  const [error, setError] = useState(null);
  
useEffect(() => {
let ans = (code ^ process.env.DATA_KEY)+process.env.DATA_KEY_SUB;
console.log((3 ^ process.env.DATA_KEY)+process.env.DATA_KEY_SUB );
setencode(ans);
}, [code]);
function isvalidcode(code){
  if(code === ''){
    setError('Please enter code');
    return false;
  }
return true;
}
   

  return (
    <>
      <div className="container">
        <h1>Join</h1>
        <div className="btn">
        
          <input
            type="text"
            value={code}
            onChange={(e) => {setCode(e.target.value);
             
            }}
            id="code"
            placeholder="Enter code"
          />
          <Link to={`/quize/${ans}`}>
            <button className="bt">Join</button>
          </Link>
     
        </div>
        {error && <p className="error">{error}</p>}
        {/* Display success/error messages or data here */}
      </div> 
    </>
  );
}
