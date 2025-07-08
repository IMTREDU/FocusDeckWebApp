import React, { useState } from 'react';
import './Banner.css';

const Banner = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="banner">
      <span>🎉 {text}</span>
      <button onClick={() => setIsVisible(false)} aria-label="Close banner">
        ✕
      </button>
    </div>
  );
};

export default Banner; 