import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { TasksApi } from '../api/apis/tasks-api';
import { TaskResponse, TaskCreateRequest, TaskUpdateRequest } from '../api/models';
import { Configuration } from '../api/configuration';

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [newTask, setNewTask] = useState<TaskCreateRequest>({
    title: '',
    description: '',
    completed: false
  });
  
  // API configuration with the correct base URL
const api = useMemo(() => {
  const config = new Configuration({
    basePath: ''
  });
  return new TasksApi(config);
}, []);

  // A function for uploading tasks
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.apiOpenapiV1TasksGet(); 
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [api]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Creating an issue
  const handleCreateTask = async () => {
    try {
      await api.apiOpenapiV1TasksPost(newTask); 
      
      setNewTask({ title: '', description: '', completed: false });
      
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Switching task status
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await api.apiOpenapiV1TasksIdPatch(
        id, 
        { completed: !currentStatus } as TaskUpdateRequest
      );
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Deleting an issue
  const handleDeleteTask = async (id: number) => {
    try {
      await api.apiOpenapiV1TasksIdDelete(id);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Todo App</h1>
      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Task List</h2>
      
      {/* Форма создания задачи */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Create New Task</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            style={{ 
              width: '100%', 
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Task description"
            value={newTask.description || ''}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            style={{ 
              width: '100%', 
              height: '80px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={newTask.completed}
              onChange={(e) => setNewTask({...newTask, completed: e.target.checked})}
              style={{ marginRight: '5px' }}
            />
            Completed
          </label>
        </div>
        
        <button 
          onClick={handleCreateTask}
          style={{ 
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No tasks found. Create your first task!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li 
              key={task.id} 
              style={{ 
                backgroundColor: '#fff',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${task.completed ? '#4CAF50' : '#ff9800'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {task.title}
                  </h3>
                  <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                    {task.description || 'No description'}
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => handleDeleteTask(task.id!)}
                    style={{ 
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '5px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <label style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => handleToggleStatus(task.id!, task.completed!)}
                    style={{ marginRight: '5px' }}
                  />
                  {task.completed ? 'Completed' : 'Pending'}
                </label>
                
                <span style={{ color: '#888', fontSize: '14px' }}>
                  Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;