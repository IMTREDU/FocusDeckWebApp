import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import Header from '../../components/Header';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Header />
      <main className="hero-section">
        <div className="hero-content">
          <h1>
            Focus Better,<br />
            Achieve More
          </h1>
          <p className="hero-subtitle">
            The #1 AI-powered productivity app for deep work.<br />
            Built for creators, students, and achievers.
          </p>
          <div className="hero-actions">
            <button 
              className="primary-button"
              onClick={() => navigate('/home')}
            >
              Start Focusing
            </button>
            <a 
              href="https://github.com/yourusername/focusdeck" 
              target="_blank" 
              rel="noopener noreferrer"
              className="secondary-button"
            >
              GitHub Source Code
            </a>
          </div>
        </div>
        <div className="hero-illustration">
          <img 
            src="/assets/images/hero-illustration.svg" 
            alt="FocusDeck features illustration"
            className="hero-image"
          />
        </div>
      </main>
    </div>
  );
};

export default Landing; 