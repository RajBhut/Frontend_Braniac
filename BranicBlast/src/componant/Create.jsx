import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Create.css'
import { useAuth0  } from '@auth0/auth0-react';

const Create = () => {
  
const [code , setcode] = useState();

  const { isAuthenticated  , loginWithRedirect , user} = useAuth0();
 
 const [username , setusername] = useState();
 useEffect(() => { 
  setusername(user.name);
  const fetchData = async () => {
    try {
        const response = await axios.get('https://brainac-blast-backend.vercel.app/quizzes');
        setcode(response.data[0]); 
    } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  fetchData(); 
} , []);


    const [questions, setQuestions] = useState([{question:'',options:[]}]);
    
   
    const [isquestionempty , setisquestionempty] = useState(false);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', options: [] }]);
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


    const handleSubmit = async () =>
     {
        const quizData = {
            questions: questions.map((question) => ({
              question: question.question,
              opt1: question.options[0] || '',
              opt2: question.options[1] || '',
              opt3: question.options[2] || '',
              opt4: question.options[3] || '',
              ans: question.options[4] || '',
              user_name : username,
              generation_code : code 
            })),
          };

          try {
             const response = await axios.post('https://brainac-blast-backend.vercel.app/quizzes', quizData);
            if(response.status === 201){
            setQuestions([{question:'',options:[]}]);
          
           setisquestionempty(false);
            }
          

            // ...
          } catch (error) {
            if(error.response.status === 400){  
                setisquestionempty(true);
            }
          }

        console.log('Submitted Quiz:', questions); // Replace with API call or data processing
    };

    return (
        <div className="quiz-builder">
            <h2>Build Your Quiz</h2>
     <h3>Quiz Code : {code}</h3>
            {questions.map((question, index) => (
    <div key={index} className="question">
    <label htmlFor={`question-${index}`}>Question {index + 1}</label>
    <input className='question-input'
        type="text"
        id={`question-${index}`}
        value={question.question}
        onChange={(e) => handleQuestionChange(index, e)}/>
    {question.options && (
      <div className="options">
        <div className="option">
          <label htmlFor={`option-${index}-0`}>Option 1</label>
          <input
            type="text"
            id={`option-${index}-0`}
            value={question.options[0] || ''}
            onChange={(e) => handleOptionChange(index, 0, e)}
          />
        </div>
        <div className="option">
          <label htmlFor={`option-${index}-1`}>Option 2</label>
          <input
            type="text"
            id={`option-${index}-1`}
            value={question.options[1] || ''}
            onChange={(e) => handleOptionChange(index, 1, e)}
          />
        </div>
        <div className="option">
          <label htmlFor={`option-${index}-2`}>Option 3</label>
          <input
            type="text"
            id={`option-${index}-2`}
            value={question.options[2] || ''}
            onChange={(e) => handleOptionChange(index, 2, e)}
          />
        </div>
        <div className="option">
          <label htmlFor={`option-${index}-3`}>Option 4</label>
          <input
            type="text"
            id={`option-${index}-3`}
            value={question.options[3] || ''}
            onChange={(e) => handleOptionChange(index, 3, e)}
          />
        </div>

        <div className="option">
          <label htmlFor={`option-${index}-4`}>Answer</label>
          <input
            type="number"
            id={`option-${index}-4`}
            value={question.options[4] || ''}
            onChange={(e) => handleOptionChange(index, 4, e)}
          />
        </div>
       
        
      </div>
    )}
  </div>
))}

            <button onClick={handleAddQuestion}>Add Question</button>
            <button className = "subbt"onClick={handleSubmit}>Submit Quiz</button>
            
<Link to="/deshbord"> <button>View Quizzes</button></Link>
{isquestionempty ? <p style={  
  {color: 'red',fontSize: '20px',fontWeight: 'bold',textAlign: 'center'}
}>Question or Answer is empty</p> : null}

        </div>
    );
};

export default Create;
