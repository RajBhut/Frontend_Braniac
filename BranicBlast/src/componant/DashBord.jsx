// import React from 'react'
// import './DashBord.css'
// import { Link } from 'react-router-dom'
// import { useAuth0 } from "@auth0/auth0-react";
// export default function DashBord() {
//   const { logout , isAuthenticated  , loginWithRedirect , user} = useAuth0();

//   return (
//     <>
//    <div className="container">
//     <h1 >DashBoard</h1>
//     <center>{isAuthenticated ? <h2>Welcome {user.name}</h2> : <h2>Welcome Guest</h2>}
//     </center>
//     <div className="btn">
// { isAuthenticated ? <Link style={{color:'white' , textDecoration:'none'}} to={'/create'}><button className='bt'>
//   Create
// </button> </Link> : null}
// <Link style={{color:'white' , textDecoration:'none'}} to={'/join'}><button className='bt'>
// join
// </button> </Link>

// </div>
// {isAuthenticated ? <button onClick={() => logout()}>Logout</button> : <button onClick={() => loginWithRedirect()}>Login</button>}

// </div>
//   </>

//   )
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Home,
  LogIn,
  LogOut,
  Send,
  Copy,
  Award,
} from "lucide-react";

const Dashboard = () => {
  const { logout, isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-center text-indigo-600 mb-8"
        >
          Dashboard
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl p-8 mb-8"
        >
          {isAuthenticated ? (
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Welcome back, {user.name}!
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Welcome Guest
            </h2>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-8">
            {isAuthenticated && (
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <PlusCircle size={20} />
                  Create Quiz
                </motion.button>
              </Link>
            )}
            <Link to="/join">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Send size={20} />
                Join Quiz
              </motion.button>
            </Link>
          </div>

          <div className="flex justify-center">
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => logout()}
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loginWithRedirect()}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <LogIn size={20} />
                Login
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Dashboard;
