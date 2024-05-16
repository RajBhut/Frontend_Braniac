import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PathRouts from './componant/PathRouts.jsx'
import Create from './componant/Create.jsx'
import Join from './componant/Join.jsx'
import Quiz from './componant/Quiz.jsx'
import Login from './componant/Login.jsx'
import Quize from './componant/Quize.jsx'
import DashBord from './componant/DashBord.jsx'





ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
 
  <PathRouts/>
  </React.StrictMode>,
)
