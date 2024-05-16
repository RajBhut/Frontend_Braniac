import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Join from './Join';
import Create from './Create';
import DashBord from './DashBord';
import Home from './Home';
import Quize from './Quize';
export default function PathRouts() {
    return (
       <Router>
            <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/create" element={<Create/>} />
             <Route path="/join" element={<Join/>} />
             <Route path='/login' element={<Login/>} />
             <Route path='/quize' element={<Quize id={1}/>} />
             <Route path='/deshbord' element={<DashBord/>} />
            </Routes>
        </Router>
    );
}