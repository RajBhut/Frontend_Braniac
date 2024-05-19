import React from "react";
import { Link } from "react-router-dom";
import './home.css'; // Import your CSS file

export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Our Quiz App!</h1>
                <p>Test your knowledge and improve your skills. Start quizzing today!</p>
            </header>
            <div className="home-content">
                <h2>Ready to Challenge Yourself?</h2>
                <p>Click the button below to start a quiz.</p>
            </div>
            <div className="home-actions">
                <Link to="/login" className="home-link">Start Quiz</Link>
            </div>
        </div>
    );
}