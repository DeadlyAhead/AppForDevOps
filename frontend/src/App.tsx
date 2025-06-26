import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <TaskList />
      </header>
    </div>
  );
}

export default App;