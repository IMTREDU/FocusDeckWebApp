import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './StatsPage.css';

// Mock data for demonstration
const weeklyFocusData = [
  { day: 'Mon', minutes: 120 },
  { day: 'Tue', minutes: 150 },
  { day: 'Wed', minutes: 180 },
  { day: 'Thu', minutes: 140 },
  { day: 'Fri', minutes: 160 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 60 }
];

const monthlyProgressData = [
  { week: 'Week 1', pomodoros: 15, cards: 30 },
  { week: 'Week 2', pomodoros: 20, cards: 45 },
  { week: 'Week 3', pomodoros: 18, cards: 40 },
  { week: 'Week 4', pomodoros: 25, cards: 50 }
];

const StatsPage = () => {
  const totalFocusTime = weeklyFocusData.reduce((acc, curr) => acc + curr.minutes, 0);
  const averageDailyFocus = Math.round(totalFocusTime / weeklyFocusData.length);
  const totalPomodoros = monthlyProgressData.reduce((acc, curr) => acc + curr.pomodoros, 0);
  const totalCards = monthlyProgressData.reduce((acc, curr) => acc + curr.cards, 0);

  return (
    <div className="stats-page">
      <section className="stats-overview">
        <h2>Monthly Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Focus Time</h3>
            <p>{Math.round(totalFocusTime / 60)} hours</p>
          </div>
          <div className="stat-card">
            <h3>Daily Average</h3>
            <p>{Math.round(averageDailyFocus)} minutes</p>
          </div>
          <div className="stat-card">
            <h3>Completed Pomodoros</h3>
            <p>{totalPomodoros}</p>
          </div>
          <div className="stat-card">
            <h3>Cards Reviewed</h3>
            <p>{totalCards}</p>
          </div>
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Weekly Focus Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyFocusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="minutes"
                name="Minutes"
                fill="var(--primary-color)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pomodoros"
                name="Pomodoros"
                stroke="var(--primary-color)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cards"
                name="Cards Reviewed"
                stroke="#ffc107"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="insights-section">
        <h3>Monthly Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Most Productive Day</h4>
            <p>Wednesday</p>
            <span>180 minutes of focus time</span>
          </div>
          <div className="insight-card">
            <h4>Weekly Improvement</h4>
            <p>+25%</p>
            <span>Compared to last week</span>
          </div>
          <div className="insight-card">
            <h4>Learning Streak</h4>
            <p>5 days</p>
            <span>Keep it up!</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsPage; 