// import React from "react";
// import { Link } from "react-router-dom";
// import './home.css'; // Import your CSS file

// export default function Home() {
//     return (
//         <div className="home-container">
//             <header className="home-header">
//                 <h1>Welcome to Our Quiz App!</h1>
//                 <p>Test your knowledge and improve your skills. Start quizzing today!</p>
//             </header>
//             <div className="home-content">
//                 <h2>Ready to Challenge Yourself?</h2>
//                 <p>Click the button below to start a quiz.</p>
//             </div>
//             <div className="home-actions">
//                 <Link to="/login" className="home-link">Start Quiz</Link>
//             </div>
//         </div>
//     );
// }
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, ArrowRight, Award, Users, BookOpen } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Brain size={64} className="text-indigo-600" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to BrainBlast Quiz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Test your knowledge, challenge your friends, and improve your skills
            with our interactive quiz platform.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
            >
              Start Quiz
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement and earn achievements as you learn
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Compete with Friends
              </h3>
              <p className="text-gray-600">
                Challenge your friends and see who scores the highest
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Together</h3>
              <p className="text-gray-600">
                Create and share quizzes with your study group
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-indigo-600 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Challenge Yourself?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of learners who are already improving their knowledge
            through quizzes.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
