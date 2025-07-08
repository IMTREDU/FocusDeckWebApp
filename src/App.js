// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './views/Header';
import Layout from './components/Layout/Layout';

// Page components
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import FlashcardManagementPage from './pages/FlashcardManagement/FlashcardManagementPage';
import FlashcardReviewPage from './pages/FlashcardReview/FlashcardReviewPage';
import PomodoroPage from './pages/Pomodoro/PomodoroPage';
import StatsPage from './pages/Stats/StatsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<Header />} />
        
        {/* Protected routes with shared layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/flashcard-management" element={<FlashcardManagementPage />} />
          <Route path="/flashcard-review" element={<FlashcardReviewPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;