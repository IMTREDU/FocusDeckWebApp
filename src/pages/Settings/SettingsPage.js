import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

const DEFAULT_SETTINGS = {
  theme: 'light',
  notifications: true,
  soundEffects: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  showMotivationalQuotes: true,
  language: 'en',
  cardReviewSettings: {
    dailyGoal: 50,
    newCardsPerDay: 10,
    reviewIntervals: [1, 3, 7, 14, 30],
  },
  pomodoroSettings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
  }
};

const SettingsPage = () => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    }
  }, [settings, isDirty]);

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object'
        ? { ...prev[section], [key]: value }
        : value
    }));
    setIsDirty(true);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setIsDirty(true);
  };

  return (
    <div className="settings-page">
      <section className="settings-header">
        <h1>Settings</h1>
        <p>Customize your experience</p>
      </section>

      <section className="settings-section">
        <h2>Appearance</h2>
        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => handleChange('theme', null, e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div className="setting-item">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleChange('language', null, e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-group">
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', null, e.target.checked)}
              />
              Enable Notifications
            </label>
          </div>

          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => handleChange('soundEffects', null, e.target.checked)}
              />
              Sound Effects
            </label>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2>Pomodoro Timer</h2>
        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="workDuration">Work Duration (minutes)</label>
            <input
              type="number"
              id="workDuration"
              min="1"
              max="60"
              value={settings.pomodoroSettings.workDuration}
              onChange={(e) => handleChange('pomodoroSettings', 'workDuration', parseInt(e.target.value))}
            />
          </div>

          <div className="setting-item">
            <label htmlFor="shortBreak">Short Break (minutes)</label>
            <input
              type="number"
              id="shortBreak"
              min="1"
              max="30"
              value={settings.pomodoroSettings.shortBreakDuration}
              onChange={(e) => handleChange('pomodoroSettings', 'shortBreakDuration', parseInt(e.target.value))}
            />
          </div>

          <div className="setting-item">
            <label htmlFor="longBreak">Long Break (minutes)</label>
            <input
              type="number"
              id="longBreak"
              min="1"
              max="60"
              value={settings.pomodoroSettings.longBreakDuration}
              onChange={(e) => handleChange('pomodoroSettings', 'longBreakDuration', parseInt(e.target.value))}
            />
          </div>

          <div className="setting-item">
            <label htmlFor="longBreakInterval">Long Break Interval</label>
            <input
              type="number"
              id="longBreakInterval"
              min="2"
              max="8"
              value={settings.pomodoroSettings.longBreakInterval}
              onChange={(e) => handleChange('pomodoroSettings', 'longBreakInterval', parseInt(e.target.value))}
            />
          </div>

          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.autoStartBreaks}
                onChange={(e) => handleChange('autoStartBreaks', null, e.target.checked)}
              />
              Auto-start Breaks
            </label>
          </div>

          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.autoStartPomodoros}
                onChange={(e) => handleChange('autoStartPomodoros', null, e.target.checked)}
              />
              Auto-start Pomodoros
            </label>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2>Flashcard Review</h2>
        <div className="setting-group">
          <div className="setting-item">
            <label htmlFor="dailyGoal">Daily Review Goal</label>
            <input
              type="number"
              id="dailyGoal"
              min="1"
              max="200"
              value={settings.cardReviewSettings.dailyGoal}
              onChange={(e) => handleChange('cardReviewSettings', 'dailyGoal', parseInt(e.target.value))}
            />
          </div>

          <div className="setting-item">
            <label htmlFor="newCards">New Cards per Day</label>
            <input
              type="number"
              id="newCards"
              min="1"
              max="50"
              value={settings.cardReviewSettings.newCardsPerDay}
              onChange={(e) => handleChange('cardReviewSettings', 'newCardsPerDay', parseInt(e.target.value))}
            />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2>Additional Settings</h2>
        <div className="setting-group">
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.showMotivationalQuotes}
                onChange={(e) => handleChange('showMotivationalQuotes', null, e.target.checked)}
              />
              Show Motivational Quotes
            </label>
          </div>
        </div>
      </section>

      <div className="settings-actions">
        <button className="reset-button" onClick={resetSettings}>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 