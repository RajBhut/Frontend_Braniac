import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import PathRouts from "./componant/PathRouts.jsx";

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3eyrwofo7awqke6w.us.auth0.com"
      clientId="2vx9ey1YUVpVF2gBNj0Rg3ec7QSQOGAv"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <PathRouts />
    </Auth0Provider>
  </React.StrictMode>
);
