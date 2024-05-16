import React, { useEffect, useRef, useState } from 'react';
import './Quiz.css'
import axios from 'axios';

const Quiz = ({ id }) => {
  const [questions, setQuestions] = useState([]); // More descriptive name
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null); // Initialize
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false); // Use camelCase

  useEffect(() => {
    async function fetchData()  {
      try {
        const response = await axios.get(`https://brainac-blast-backend.vercel.app/api/${1}`);
        
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
       
      }
    }

    fetchData();
  }, [id]); // Dependency on id prop

  const optionRef = useRef([]); // Array to hold option refs

  const checkAnswer = (e, answer) => {
    if (!isLocked) {
      if (currentQuestion.answer === answer) {
        e.target.classList.add("correct");
        setIsLocked(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setIsLocked(true);
        optionRef.current[currentQuestion.answer - 1].classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (isLocked) {
      if (currentIndex === questions.length - 1) {
        setShowResult(true);
        return;
      }
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex]);
      setIsLocked(false);
      optionRef.current.forEach(option => option.classList.remove("wrong", "correct"));
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setIsLocked(false);
    setShowResult(false);
  };

  return (
    <>
     <h1>Hellows</h1> 
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {showResult ? (
        <>
          <h2>You Scored {score} out of {questions.length}</h2>
          <button onClick={resetQuiz}>Reset</button>
        </>
      ) : (
        questions.length === 0 ? (
          <p>Loading questions...</p>
        ) : (
          <>
           <h2>{currentIndex + 1}. {currentQuestion?.question}</h2> {/* Check for null */}

            <ul>
              {questions.map((question, index) => (
                <li key={index} ref={el => (optionRef.current[index] = el)} onClick={(e) => checkAnswer(e, question.answer)}>
                  {question.opt1}
                </li>
              ))}
            </ul>
            <button onClick={nextQuestion}>Next</button>
            <div className="index">{currentIndex + 1} of {questions.length} questions</div>
          </>
        )
      )}
    </div>
   </>
  );
};

export default Quiz;
