import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { TasksApi } from '../api/apis/tasks-api';
import { TaskResponse, TaskCreateRequest, TaskUpdateRequest } from '../api/models';
import { Configuration } from '../api/configuration';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [newTask, setNewTask] = useState<TaskCreateRequest>({
    title: '',
    description: '',
    completed: false
  });

  const api = useMemo(() => {
    const config = new Configuration({
      basePath: ''
    });
    return new TasksApi(config);
  }, []);

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

  const handleCreateTask = async () => {
    if (!newTask.title) return;
    try {
      await api.apiOpenapiV1TasksPost(newTask);
      setNewTask({ title: '', description: '', completed: false });
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

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

  const handleDeleteTask = async (id: number) => {
    try {
      await api.apiOpenapiV1TasksIdDelete(id);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list-container">
      <h1 className="main-title">Todo App</h1> {}
      
      <div className="task-form">
        <h3>Create New Task</h3>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="task-input"
        />
        <textarea
          placeholder="Task description"
          value={newTask.description || ''}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="task-textarea"
        />
        <div className="task-form-actions">
          <label className="checkbox-label"> {}
            <input
              type="checkbox"
              checked={newTask.completed}
              onChange={(e) => setNewTask({ ...newTask, completed: e.target.checked })}
            />
            Completed
          </label>
          <button onClick={handleCreateTask} className="add-task-btn">
            Add Task
          </button>
        </div>
      </div>

      <h2 className="task-list-header">Your Tasks</h2> {}
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks found. Create your first task!</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}> {}
              <div className="task-item-content">
                <h3>{task.title}</h3>
                <p>{task.description || 'No description'}</p>
              </div>
              <div className="task-item-actions">
                <button onClick={() => handleDeleteTask(task.id!)} className="delete-btn">
                  Delete
                </button>
                <label className="status-toggle-btn"> {}
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => handleToggleStatus(task.id!, task.completed!)}
                    style={{ display: 'none' }}
                  />
                  {task.completed ? 'Done' : 'Mark as Done'} {}
                </label>
              </div>
              <span className="timestamp">
                Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;