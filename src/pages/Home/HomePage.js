import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const quickLinks = [
    { 
      to: '/dashboard', 
      label: 'Task Dashboard', 
      description: 'Manage your tasks and priorities',
      icon: 'fas fa-tasks',
      cta: 'Go to Dashboard →'
    },
    { 
      to: '/flashcard-management', 
      label: 'Flashcards', 
      description: 'Create and manage your study materials',
      icon: 'fas fa-layer-group',
      cta: 'View Flashcards →'
    },
    { 
      to: '/pomodoro', 
      label: 'Focus Timer', 
      description: 'Stay productive with Pomodoro technique',
      icon: 'fas fa-clock',
      cta: 'Start Timer →'
    },
    { 
      to: '/stats', 
      label: 'Progress Stats', 
      description: 'Track your learning progress',
      icon: 'fas fa-chart-line',
      cta: 'View Progress →'
    }
  ];

  useEffect(() => {
    // Add fade-in class after component mounts
    const homeContent = document.querySelector('.home-page');
    if (homeContent) {
      homeContent.classList.add('fade-in');
    }
  }, []);

  return (
    <main className="home-page">
      <section className="welcome-section" role="banner">
        <h1>Welcome back!</h1>
        <p>Ready to boost your productivity? Choose an activity to get started.</p>
      </section>

      <section className="quick-links" aria-labelledby="quick-actions-title">
        <h2 id="quick-actions-title">Quick Actions</h2>
        <div className="quick-links-grid">
          {quickLinks.map(({ to, label, description, icon, cta }) => (
            <Link 
              to={to} 
              key={to} 
              className="quick-link-card"
              role="button"
              aria-label={`Go to ${label}`}
            >
              <div className="card-icon">
                <i className={icon} aria-hidden="true"></i>
              </div>
              <h3>{label}</h3>
              <p>{description}</p>
              <span className="card-cta">{cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="dr-focus-helper" role="complementary">
        <div className="dr-focus-avatar">
          <i className="fas fa-robot" aria-hidden="true"></i>
        </div>
        <div className="dr-focus-tooltip">
          Need help staying focused? I'm Dr. Focus, your AI productivity assistant!
        </div>
      </div>
    </main>
  );
};

export default HomePage; 