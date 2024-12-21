// import axios, { Axios } from "axios";

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import { useEffect } from "react";
// export default function Join() {
//   const [code, setCode] = useState();
//   const [encode, setencode] = useState();
//   const [error, setError] = useState(null);

//   useEffect(() => {}, [code]);
//   function isvalidcode(code) {
//     if (code === "") {
//       setError("Please enter code");
//       return false;
//     }
//     return true;
//   }

//   return (
//     <>
//       <div className="container">
//         <h1>Join</h1>
//         <div className="btn">
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => {
//               setCode(e.target.value);
//             }}
//             id="code"
//             placeholder="Enter code"
//           />
//           <Link to={`/quize/${code * 2024}`}>
//             <button className="bt">Join</button>
//           </Link>
//         </div>
//         {error && <p className="error">{error}</p>}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowRight,
  Home,
  RefreshCcw,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

// Join Component
const join = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setError(null);
  };

  const handleJoin = (e) => {
    if (!code) {
      e.preventDefault();
      setError("Please enter a quiz code");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Join Quiz
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quiz Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter quiz code"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-500"
            >
              <AlertCircle size={20} />
              <p>{error}</p>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={code ? `/quize/${code * 2024}` : "#"}
              className="flex-1"
              onClick={handleJoin}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Join Quiz
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link to="/deshbord" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <Home size={20} />
                Dashboard
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default join;
