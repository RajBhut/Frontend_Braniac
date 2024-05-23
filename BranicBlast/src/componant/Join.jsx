import axios, { Axios } from 'axios';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dotenv from 'dotenv';
import {useHistory , useEffect} from 'react-router-dom';
export default function Join() {
  dotenv.config();
  const [code, setCode] = useState();
const [encode , setencode] = useState(); 
  const [error, setError] = useState(null);
  
useEffect(() => {
let ans = (code ^ process.env.DATA_KEY)+process.env.DATA_KEY_SUB;
setencode(ans);
}, [code]);
function isvalidcode(code){
  if(code === ''){
    setError('Please enter code');
    return false;
  }
  else if(code === NaN){
    setError('Please enter valid code');
    return false;
  }
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
          <Link to={`/quize/${encode}`}>
            <button className="bt">Join</button>
          </Link>
     
        </div>
        {error && <p className="error">{error}</p>}
        {/* Display success/error messages or data here */}
      </div> 
    </>
  );
}
