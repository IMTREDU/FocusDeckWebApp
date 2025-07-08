import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import './Header.css';
import focusDeckLogo from '../assets/images/FocusDeck-Logo-v1.png';
import doodleImage from '../assets/images/Doodle2.png';
import Banner from '../components/Banner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isHomePage = location.pathname === '/home';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
    setIsMenuOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleLogin = () => {
    navigate('/home');
  };

  // Landing page header
  if (isLandingPage) {
    return (
      <>
        <Banner text="🎉 Welcome to FocusDeck! Get started with AI-powered productivity today." />
        <header className="header-container landing">
          <nav className="navbar">
            <div className="logo-section">
              <img src={focusDeckLogo} alt="FocusDeck Logo" className="logo-icon" />
              <span className="brand-text">FocusDeck</span>
            </div>

            <div className="nav-center">
              <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
                <li><a href="#ai-sorting">AI Sorting</a></li>
                <li><a href="#focus-mode">Focus Mode</a></li>
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#dr-focus">Dr. Focus</a></li>
              </ul>
            </div>

            <div className="auth-buttons">
              <button className="login-btn" onClick={handleLogin}>Log in</button>
              <button className="contact-btn">Contact Me</button>
            </div>
          </nav>

          <div className="hero-section">
            <div className="hero-content">
              <h1>Focus Better,<br/>Achieve More</h1>
              <p>The #1 AI-powered productivity app for deep work.<br/>Built for creators, students, and achievers.</p>
              <div className="cta-buttons">
                <button className="start-focusing-btn" onClick={handleLogin}>Start Focusing</button>
                <button className="github-btn">GitHub Source Code</button>
              </div>
            </div>
            <div className="hero-illustration">
              <img src={doodleImage} alt="Productivity Illustration" className="doodle-image" />
            </div>
          </div>

          <footer className="landing-footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Get Started</h3>
                <ul>
                  <li><a href="#">Quick Start Guide</a></li>
                  <li><a href="#">Video Tutorials</a></li>
                  <li><a href="#">Best Practices</a></li>
                  <li><a href="#">FAQs</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Stay Focused</h3>
                <ul>
                  <li><a href="#">Focus Mode</a></li>
                  <li><a href="#">AI Task Assistant</a></li>
                  <li><a href="#">Pomodoro Timer</a></li>
                  <li><a href="#">Productivity Analytics</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Your Space</h3>
                <ul>
                  <li><a href="#">Dashboard</a></li>
                  <li><a href="#">Account Settings</a></li>
                  <li><a href="#">Progress Tracking</a></li>
                  <li><a href="#">Integrations</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Community & More</h3>
                <ul>
                  <li><a href="#">Community Forum</a></li>
                  <li><a href="#">Team Plans</a></li>
                  <li><a href="#">Product Updates</a></li>
                  <li><a href="#">Success Stories</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>Need help staying focused? Join our community or contact us at support@focusdeck.com</p>
            </div>
          </footer>
        </header>
      </>
    );
  }

  // Home page header (minimal)
  if (isHomePage) {
    return (
      <header className="header-container home">
        <nav className="navbar">
          <div className="logo-section" onClick={handleLogoClick}>
            <img src={focusDeckLogo} alt="FocusDeck Logo" className="logo-icon" />
            <span className="brand-text">FocusDeck</span>
          </div>
        </nav>
      </header>
    );
  }

  // Authenticated pages header with navigation
  return (
    <header className="header-container authenticated">
      <nav className="navbar">
        <div className="logo-section" onClick={handleLogoClick}>
          <img src={focusDeckLogo} alt="FocusDeck Logo" className="logo-icon" />
          <span className="brand-text">FocusDeck</span>
        </div>

        <div className="nav-center">
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <li>
              <NavLink to="/dashboard">
                <i className="fas fa-th-large"></i>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/flashcard-management">
                <i className="fas fa-layer-group"></i>
                Flashcards
              </NavLink>
            </li>
            <li>
              <NavLink to="/pomodoro">
                <i className="fas fa-clock"></i>
                Pomodoro
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats">
                <i className="fas fa-chart-bar"></i>
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <i className="fas fa-cog"></i>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="user-actions">
          <div className="notifications-wrapper">
            <button 
              className={`notifications-btn ${isNotificationsOpen ? 'active' : ''}`} 
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            {isNotificationsOpen && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button className="mark-all-read">Mark all as read</button>
                </div>
                <ul className="notifications-list">
                  <li className="notification-item unread">
                    <span className="notification-dot"></span>
                    <div className="notification-content">
                      <p>You've completed 3 Pomodoro sessions today!</p>
                      <span className="notification-time">2 hours ago</span>
                    </div>
                  </li>
                  <li className="notification-item unread">
                    <span className="notification-dot"></span>
                    <div className="notification-content">
                      <p>Time to review your flashcards</p>
                      <span className="notification-time">5 hours ago</span>
                    </div>
                  </li>
                  <li className="notification-item">
                    <div className="notification-content">
                      <p>Weekly progress report is ready</p>
                      <span className="notification-time">1 day ago</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="profile-wrapper">
            <button 
              className={`profile-btn ${isProfileOpen ? 'active' : ''}`} 
              onClick={toggleProfile}
              aria-label="Profile menu"
            >
              <div className="profile-avatar">
                <i className="fas fa-user"></i>
              </div>
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="profile-info">
                    <div className="profile-avatar large">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="profile-details">
                      <h3>John Doe</h3>
                      <p>john.doe@example.com</p>
                    </div>
                  </div>
                </div>
                <ul className="profile-menu">
                  <li>
                    <NavLink to="/settings/profile">
                      <i className="fas fa-user-cog"></i>
                      Profile Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings/preferences">
                      <i className="fas fa-sliders-h"></i>
                      Preferences
                    </NavLink>
                  </li>
                  <li>
                    <button className="logout-btn">
                      <i className="fas fa-sign-out-alt"></i>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
