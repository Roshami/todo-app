import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const loadTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error('Failed to load tasks', err);
    }
  };

  const handleTaskDeleted = () => {
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Todo Tasks</h1>
        <div className="form-wrapper">
          <TaskForm onTaskAdded={loadTasks} apiUrl={API_BASE} />
        </div>
      </div>
      <div className="spacer"></div>
      <div className="list-container">
        <TaskList tasks={tasks} onTaskDone={loadTasks} onTaskDeleted={handleTaskDeleted} apiUrl={API_BASE} />
      </div>
    </div>
  );
}

export default App;
