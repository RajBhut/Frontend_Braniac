import React, { useEffect, useRef, useState } from 'react'
import './Quiz.css'

import axios from 'axios';

const Quize = ({id}) => {
    const [questions, setQuestions] = useState([{question:'',opt1:'',opt2:'',opt3:'',opt4:'',ans:''}]); 
    useEffect(()=>{
        async function fetchData(){
            try{
        let res =    await  axios.get(`https://brainac-blast-backend.vercel.app/api/${id}`)
setQuestions(res.data);
            }
            catch(error){
                console.error("Error fetching data:",error);
            }
        }
        fetchData();
    },[id]);

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(questions[index]);
    let [lock,setLock] =useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);
    
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1,Option2,Option3,Option4];

    const checkAns = (e,ans) => {
        if(lock == false){
            if (question.answer==ans){
                e.target.classList.add("correct");
                console.log("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }    
        }
    }

    const next = ()=>{
        if (lock===true){
            if(index === questions.length -1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(questions[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }

    }

    const reset = () => {
        setIndex(0);
        setQuestion(questions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

  return (
    <div className='container'>
          
        <h1>Quiz App</h1>
        <hr />
        {result?<></>:<>
        <h2>{index+1}.{questions[index].question}</h2>
        <ul>
            <li ref={Option1}onClick={(e)=>{checkAns(e,1)}}>{question.opt1}</li>
            <li ref={Option2}onClick={(e)=>{checkAns(e,2)}}>{question.opt2}</li>
            <li ref={Option3}onClick={(e)=>{checkAns(e,3)}}>{question.opt3}</li>
            <li ref={Option4}onClick={(e)=>{checkAns(e,4)}}>{question.opt4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} of {questions.length} questions</div></>}
        {result?<>
            <h2>You Scored {score} out of {questions.length}</h2>
        <button onClick={reset}>Reset</button>
       </>:<></>}
       
        </div>
  )
}

export default Quize