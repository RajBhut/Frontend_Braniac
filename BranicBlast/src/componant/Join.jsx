import axios, { Axios } from 'axios';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Join() {
  const [code, setCode] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added for loading indicator
const [isfinish , setisfinish] = useState(false)
  const fetchData = async () => {
    setIsLoading(true); // Set loading indicator before request
    try {

      const response = await axios.get(`https://brainac-blast-backend.vercel.app/api/${code}`, { code }); // Send data in request body
    
      if (response.status !== 200) {
        throw new Error('Join failed');
      }

      setData(response.data);
     
      let code = async()=>await axios.get
      setError(null);
      setisfinish(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <div className="container">
        <h1>Join</h1>
        <div className="btn">
        
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            id="code"
            placeholder="Enter code"
          />
      <Link to={'/create'}>
            <button onClick={fetchData} className="Join" disabled={isLoading}>
            {isLoading ? 'Joining...' : 'Join Quiz'}
          </button></Link>
        </div>
        {error && <p className="error">{error}</p>}
        {/* Display success/error messages or data here */}
      </div> {isfinish}&& <h1>{data} byy</h1>
    </>
  );
}
