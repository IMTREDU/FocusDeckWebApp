import { useState, useEffect, useCallback } from 'react';

const TIMER_STATES = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
  IDLE: 'idle'
};

const DEFAULT_DURATIONS = {
  [TIMER_STATES.WORK]: 25 * 60, // 25 minutes
  [TIMER_STATES.SHORT_BREAK]: 5 * 60, // 5 minutes
  [TIMER_STATES.LONG_BREAK]: 15 * 60 // 15 minutes
};

const usePomodoro = () => {
  const [timerState, setTimerState] = useState(TIMER_STATES.IDLE);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS[TIMER_STATES.WORK]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);

  const resetTimer = useCallback((state = TIMER_STATES.WORK) => {
    setTimerState(state);
    setTimeLeft(durations[state]);
    setIsRunning(false);
  }, [durations]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      if (timerState === TIMER_STATES.WORK) {
        setCompletedPomodoros(count => count + 1);
        const nextState = completedPomodoros % 4 === 3 
          ? TIMER_STATES.LONG_BREAK 
          : TIMER_STATES.SHORT_BREAK;
        resetTimer(nextState);
      } else {
        resetTimer(TIMER_STATES.WORK);
      }

      // Notify user
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
          body: `${timerState === TIMER_STATES.WORK ? 'Break time!' : 'Time to work!'}`,
          icon: '/favicon.ico'
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerState, completedPomodoros, resetTimer]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const skipTimer = () => {
    if (timerState === TIMER_STATES.WORK) {
      setCompletedPomodoros(count => count + 1);
      const nextState = completedPomodoros % 4 === 3 
        ? TIMER_STATES.LONG_BREAK 
        : TIMER_STATES.SHORT_BREAK;
      resetTimer(nextState);
    } else {
      resetTimer(TIMER_STATES.WORK);
    }
  };

  const updateDuration = (state, minutes) => {
    const newDurations = {
      ...durations,
      [state]: minutes * 60
    };
    setDurations(newDurations);
    if (timerState === state && !isRunning) {
      setTimeLeft(newDurations[state]);
    }
  };

  return {
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
  };
};

export default usePomodoro; 