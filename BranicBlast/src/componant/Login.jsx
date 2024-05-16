import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
const Login = () => {
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(true); // Add this line
  const [confirmPassword, setConfirmPassword] = useState(''); // Add this line
  const [mode, setMode] = useState('login'); // Initial mode: login
  const [isAthenticate , SetAuthantication] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [errors, setErrors] = useState({}); // To store validation errors

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors
    console.log(formData.password , formData.email )
    if(confirmPassword !== formData.password) {
    console.log("Wrong match")
      setConfirmPasswordMatch(false);
      return;

    }

    try {
      const { email, password  , username} = formData;

      const url = mode === 'login' ? 'https://brainac-blast-backend.vercel.app/login' : 'https://brainac-blast-backend.vercel.app/signup';
      const response = await axios.post(url, formData);

      console.log('Success:', response.data); 
      SetAuthantication(true);

    } catch (error) {
      if (error.response) {
        setErrors(error.response.data); 

      } else {
        console.error('Error:', error.message); // Log other errors
      }
    }
  };

  const handleModeChange = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="auth-form">
      <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <input
          placeholder='Username'
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
          placeholder='Email'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          
          <input
          placeholder='Password'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {mode === 'signup' && (
          <div className="form-group">
            
            <input placeholder='Conform Password' type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="conform" />
          </div>
        )}
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {mode === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
        <span onClick={handleModeChange}> {mode === 'login' ? 'Sign Up' : 'Login'}</span>
      </p>
      {errors.message && <p className="error">{errors.message}</p>}
{isAthenticate &&
<Link to={'/deshbord'}>enter</Link>
}

    </div>
  );
};

export default Login;
