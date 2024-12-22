import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ArrowRight, Home, RefreshCcw, Check, X } from "lucide-react";

const Quiz = () => {
  const { id } = useParams();
  const [validcode, setValidcode] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const optionRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://brainac-blast-backend.vercel.app/api/${id / 2024}`
        );
        setQuestions(res.data);
        setQuestion(res.data[0]);
        setValidcode(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const checkAns = (e, ans) => {
    if (!lock) {
      console.log(question.ans, ans);
      if (question.ans == ans) {
        e.target.classList.add("bg-green-100");
        e.target.classList.add("border-green-500");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("bg-red-100");
        e.target.classList.add("border-red-500");
        setLock(true);

        optionRefs[question.ans - 1].current.classList.add("bg-green-100");
        optionRefs[question.ans - 1].current.classList.add("border-green-500");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setQuestion(questions[index + 1]);
      setLock(false);

      optionRefs.forEach((ref) => {
        ref.current.classList.remove("bg-green-100");
        ref.current.classList.remove("border-green-500");
        ref.current.classList.remove("bg-red-100");
        ref.current.classList.remove("border-red-500");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!validcode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-6">
            Invalid Quiz Code
          </h1>
          <Link to="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Try Again
              <RefreshCcw size={20} />
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-600">Quiz Time</h1>
            <Link to="/deshbord">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <Home size={20} />
                Dashboard
              </motion.button>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {index + 1}. {questions[index].question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["opt1", "opt2", "opt3", "opt4"].map((opt, i) => (
                    <motion.button
                      key={i}
                      ref={optionRefs[i]}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        checkAns(e, i + 1);
                      }}
                      className="p-4 text-left border-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {question[opt]}
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-8">
                  <div className="text-gray-600">
                    Question {index + 1} of {questions.length}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    disabled={!lock}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      lock
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Next
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                  {score > questions.length / 2 ? (
                    <Check size={48} className="text-green-600" />
                  ) : (
                    <X size={48} className="text-red-600" />
                  )}
                </motion.div>

                <h2 className="text-3xl font-bold mb-4">
                  You Scored {score} out of {questions.length}
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <RefreshCcw size={20} />
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Quiz;
