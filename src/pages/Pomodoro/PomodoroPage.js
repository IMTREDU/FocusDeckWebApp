import React, { useEffect } from 'react';
import usePomodoro from '../../hooks/usePomodoro';
import './PomodoroPage.css';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PomodoroPage = () => {
  const {
    timerState,
    timeLeft,
    isRunning,
    completedPomodoros,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    updateDuration,
    durations,
    TIMER_STATES
  } = usePomodoro();

  useEffect(() => {
    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const getTimerLabel = () => {
    switch (timerState) {
      case TIMER_STATES.WORK:
        return 'Work Time';
      case TIMER_STATES.SHORT_BREAK:
        return 'Short Break';
      case TIMER_STATES.LONG_BREAK:
        return 'Long Break';
      default:
        return 'Pomodoro Timer';
    }
  };

  const getProgressPercentage = () => {
    const totalDuration = durations[timerState];
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  return (
    <div className="pomodoro-page">
      <div className="timer-section">
        <h2>{getTimerLabel()}</h2>
        
        <div className="timer-display">
          <div 
            className="progress-ring"
            style={{
              background: `conic-gradient(
                var(--primary-color) ${getProgressPercentage()}%,
                var(--bg-secondary) ${getProgressPercentage()}%
              )`
            }}
          >
            <div className="time-left">{formatTime(timeLeft)}</div>
          </div>
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button onClick={startTimer} className="control-btn start-btn">
              Start
            </button>
          ) : (
            <button onClick={pauseTimer} className="control-btn pause-btn">
              Pause
            </button>
          )}
          <button onClick={() => resetTimer(timerState)} className="control-btn reset-btn">
            Reset
          </button>
          <button onClick={skipTimer} className="control-btn skip-btn">
            Skip
          </button>
        </div>

        <div className="pomodoro-stats">
          <p>Completed Pomodoros: {completedPomodoros}</p>
        </div>
      </div>

      <div className="settings-section">
        <h3>Timer Settings</h3>
        <div className="duration-settings">
          <div className="duration-input">
            <label>Work Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={durations[TIMER_STATES.WORK] / 60}
              onChange={(e) => updateDuration(TIMER_STATES.WORK, e.target.value)}
            />
          </div>
          <div className="duration-input">
            <label>Short Break (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={durations[TIMER_STATES.SHORT_BREAK] / 60}
              onChange={(e) => updateDuration(TIMER_STATES.SHORT_BREAK, e.target.value)}
            />
          </div>
          <div className="duration-input">
            <label>Long Break (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={durations[TIMER_STATES.LONG_BREAK] / 60}
              onChange={(e) => updateDuration(TIMER_STATES.LONG_BREAK, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage; 