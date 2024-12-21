// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Create.css'
// import { useAuth0  } from '@auth0/auth0-react';

// const Create = () => {

// const [code , setcode] = useState();

//   const { isAuthenticated  , loginWithRedirect , user} = useAuth0();

//  const [username , setusername] = useState();
//  useEffect(() => {
//   if (user) {
//     setusername(user.name);
// }
//   const fetchData = async () => {
//     try {
//         const response = await axios.get('https://brainac-blast-backend.vercel.app/quizzes');console.log(response.data);
//         setcode(response.data);

//     } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };
//   fetchData();
// } , [user]);

//     const [questions, setQuestions] = useState([{question:'',options:[]}]);

//     const [isquestionempty , setisquestionempty] = useState(false);

//     const handleAddQuestion = () => {
//         setQuestions([...questions, { question: '', options: [] }]);
//     };

//     const handleQuestionChange = (index, event) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[index].question = event.target.value;
//         setQuestions(updatedQuestions);
//     };

//     const handleOptionChange = (questionIndex, optionIndex, event) => {
//         const updatedQuestions = [...questions];
//         updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
//         setQuestions(updatedQuestions);
//     };
// const [submited , setsubmited] = useState(false);

//     const handleSubmit = async () =>
//      {
//         const quizData = {
//             questions: questions.map((question) => ({
//               question: question.question,
//               opt1: question.options[0] || '',
//               opt2: question.options[1] || '',
//               opt3: question.options[2] || '',
//               opt4: question.options[3] || '',
//               ans: question.options[4] || '',
//               user_name : username,
//               generation_code : Number(code)
//             })),

//           };

//           try {
//              const response = await axios.post('https://brainac-blast-backend.vercel.app/quizzes', quizData);
//             if(response.status === 201){
//             setQuestions([{question:'',options:[]}]);

//            setisquestionempty(false);setsubmited(true);
//             }

//             // ...
//           } catch (error) {
//             if(error.response.status === 400){
//                 setisquestionempty(true);
//             }
//           }

//         console.log('Submitted Quiz:', questions); // Replace with API call or data processing
//     };

//     return (
//     !submited?   <>
//          <div className="quiz-builder">
//             <h2>Build Your Quiz</h2>
//      <h3>Quiz Code : {code}</h3> <button onClick={()=>{ window.navigator.clipboard.writeText(code).then(window.alert("coppied!!!"))}}>copy</button>
//             {questions.map((question, index) => (
//     <div key={index} className="question">
//     <label htmlFor={`question-${index}`}>Question {index + 1}</label>
//     <input className='question-input'
//         type="text"
//         id={`question-${index}`}
//         value={question.question}
//         onChange={(e) => handleQuestionChange(index, e)}/>
//     {question.options && (
//       <div className="options">
//         <div className="option">
//           <label htmlFor={`option-${index}-0`}>Option 1</label>
//           <input
//             type="text"
//             id={`option-${index}-0`}
//             value={question.options[0] || ''}
//             onChange={(e) => handleOptionChange(index, 0, e)}
//           />
//         </div>
//         <div className="option">
//           <label htmlFor={`option-${index}-1`}>Option 2</label>
//           <input
//             type="text"
//             id={`option-${index}-1`}
//             value={question.options[1] || ''}
//             onChange={(e) => handleOptionChange(index, 1, e)}
//           />
//         </div>
//         <div className="option">
//           <label htmlFor={`option-${index}-2`}>Option 3</label>
//           <input
//             type="text"
//             id={`option-${index}-2`}
//             value={question.options[2] || ''}
//             onChange={(e) => handleOptionChange(index, 2, e)}
//           />
//         </div>
//         <div className="option">
//           <label htmlFor={`option-${index}-3`}>Option 4</label>
//           <input
//             type="text"
//             id={`option-${index}-3`}
//             value={question.options[3] || ''}
//             onChange={(e) => handleOptionChange(index, 3, e)}
//           />
//         </div>

//         <div className="option">
//           <label htmlFor={`option-${index}-4`}>Answer</label>
//           <input
//             type="number"
//             id={`option-${index}-4`}
//             value={question.options[4] || ''}
//             onChange={(e) => handleOptionChange(index, 4, e)}
//           />
//         </div>

//       </div>
//     )}
//   </div>
// ))}

//             <button onClick={handleAddQuestion}>Add Question</button>
//             <button className = "subbt"onClick={handleSubmit}>Submit Quiz</button>

// <Link to="/deshbord"> <button>View Quizzes</button></Link>
// {isquestionempty ? <p style={
//   {color: 'red',fontSize: '20px',fontWeight: 'bold',textAlign: 'center'}
// }>Question or Answer is empty</p> : null}

//         </div>

//         </> : <> <Link to="/deshbord"> <button>View Quizzes</button></Link></>
//     );
// };

// export default Create;
// Create Quiz Component
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { PlusCircle, Home, Send, Copy, Trash, AlertCircle } from "lucide-react";
import axios from "axios";

const Create = () => {
  const [code, setCode] = useState();
  const [questions, setQuestions] = useState([{ question: "", options: [] }]);
  const [isQuestionEmpty, setIsQuestionEmpty] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth0();
  const [username, setUsername] = useState();

  useEffect(() => {
    if (user) {
      setUsername(user.name);
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://brainac-blast-backend.vercel.app/quizzes"
        );
        setCode(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [user]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: [] }]);
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    const quizData = {
      questions: questions.map((question) => ({
        question: question.question,
        opt1: question.options[0] || "",
        opt2: question.options[1] || "",
        opt3: question.options[2] || "",
        opt4: question.options[3] || "",
        ans: question.options[4] || "",
        user_name: username,
        generation_code: Number(code),
      })),
    };

    try {
      const response = await axios.post(
        "https://brainac-blast-backend.vercel.app/quizzes",
        quizData
      );
      if (response.status === 201) {
        setQuestions([{ question: "", options: [] }]);
        setIsQuestionEmpty(false);
        setSubmitted(true);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setIsQuestionEmpty(true);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const questionVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6"
    >
      {!submitted ? (
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8"
          >
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
              Build Your Quiz
            </h2>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-700">
                  Quiz Code: {code}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.navigator.clipboard
                      .writeText(code)
                      .then(() => window.alert("Copied!"));
                  }}
                  className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  <Copy size={16} />
                  Copy
                </motion.button>
              </div>
            </div>

            {questions.map((question, qIndex) => (
              <motion.div
                key={qIndex}
                variants={questionVariants}
                initial="hidden"
                animate="visible"
                className="mb-8 p-6 bg-gray-50 rounded-lg relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <label className="text-lg font-semibold text-gray-700">
                    Question {qIndex + 1}
                  </label>
                  {questions.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash size={20} />
                    </motion.button>
                  )}
                </div>

                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  placeholder="Enter your question"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((optionNum) => (
                    <div key={optionNum} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600 mb-1">
                        Option {optionNum}
                      </label>
                      <input
                        type="text"
                        value={question.options[optionNum - 1] || ""}
                        onChange={(e) =>
                          handleOptionChange(qIndex, optionNum - 1, e)
                        }
                        placeholder={`Enter option ${optionNum}`}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Correct Answer (1-4)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={question.options[4] || ""}
                    onChange={(e) => handleOptionChange(qIndex, 4, e)}
                    placeholder="Enter correct option number"
                    className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </motion.div>
            ))}

            {isQuestionEmpty && (
              <div className="flex items-center gap-2 text-red-500 justify-center mb-6">
                <AlertCircle size={20} />
                <p className="font-medium">
                  Question or answer fields cannot be empty
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddQuestion}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle size={20} />
                Add Question
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Send size={20} />
                Submit Quiz
              </motion.button>

              <Link to="/deshbord">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  <Home size={20} />
                  Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quiz Created Successfully!
            </h2>
            <Link to="/deshbord">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <Home size={20} />
                Back to Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Create;
