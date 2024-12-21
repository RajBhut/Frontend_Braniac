import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LockKeyhole } from "lucide-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/deshbord");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="flex flex-col items-center space-y-6">
          <div className="animate-bounce">
            <div className="bg-blue-100 p-4 rounded-full">
              <LockKeyhole className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
            Welcome Back
          </h1>

          <p className="text-gray-600 text-center">
            Sign in to access your dashboard and manage your account
          </p>

          {!isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold
                         transform transition-all duration-300 ease-in-out
                         hover:bg-blue-700 hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                         active:scale-95"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>Sign In</span>
              </div>
            </button>
          )}

          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => loginWithRedirect({ screen_hint: "signup" })}
              className="text-blue-600 hover:text-blue-700 font-medium 
                         transition-colors duration-300"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-10 -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full opacity-10 -bottom-20 -right-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;
