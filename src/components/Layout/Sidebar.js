import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/flashcard-management', label: 'Flashcards' },
    { path: '/flashcard-review', label: 'Review' },
    { path: '/pomodoro', label: 'Pomodoro' },
    { path: '/stats', label: 'Stats' },
    { path: '/settings', label: 'Settings' }
  ];

  return (
    <nav className="sidebar">
      <ul>
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar; 