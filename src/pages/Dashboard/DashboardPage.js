import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'study', 'work', 'personal'];
  const priorities = ['high', 'medium', 'low'];

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      category: selectedCategory === 'all' ? 'personal' : selectedCategory,
      priority: 'medium',
      createdAt: new Date().toISOString()
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTaskPriority = (taskId, priority) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, priority } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task =>
    selectedCategory === 'all' ? true : task.category === selectedCategory
  );

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-item priority-${task.priority}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
            <div className="task-actions">
              <select
                value={task.priority}
                onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                className="priority-select"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-task-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage; 