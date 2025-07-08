import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <i className="fas fa-th-large"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/flashcard-management" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <i className="fas fa-layer-group"></i>
          <span>Flashcards</span>
        </NavLink>
        <NavLink to="/pomodoro" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <i className="fas fa-clock"></i>
          <span>Pomodoro</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <i className="fas fa-chart-bar"></i>
          <span>Stats</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer; 