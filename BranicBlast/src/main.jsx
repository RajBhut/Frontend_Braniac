import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PathRouts from './componant/PathRouts.jsx'
import Create from './componant/Create.jsx'
import Join from './componant/Join.jsx'

import Login from './componant/Login.jsx'
import Quize from './componant/Quize.jsx'
import DashBord from './componant/DashBord.jsx'


import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
 <Auth0Provider
    domain="dev-3eyrwofo7awqke6w.us.auth0.com"
    clientId="2vx9ey1YUVpVF2gBNj0Rg3ec7QSQOGAv"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <PathRouts/>
  </Auth0Provider>
  </React.StrictMode>
)
