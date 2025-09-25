"use client";

import { useState } from "react";

import TaskFooter from "./TaskFooter";

import TaskList from "./TaskList";
import TasksManager from "./TaskManager";
import type { Task } from "../types";

const initialTasks: Task[] = [
  {
    id: "1234",
    title: "Plan the project roadmap",
    description: "Create a comprehensive roadmap for the next quarter including milestones and deliverables",
    dueDate: new Date('2024-12-15'),
    completed: false,
  },
  {
    id: "1235",
    title: "Design system updates",
    description: "Update the design system with new color palette and typography guidelines",
    dueDate: new Date('2024-11-30'),
    completed: false,
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const onAddTask = (task: Task) => {
    setTasks((prev) => [...prev, { ...task, completed: false }]);
  };

  const onToggleTask = (taskId: string) => {
    setTasks((prev) => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const onDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter(task => task.id !== taskId));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="page">
      <header className="app-header">
        <h1>Modern Task Manager</h1>
        <p className="subtitle">Stay organized and productive with your daily tasks</p>
      </header>

      <div className="task-stats-grid">
        <div className="task-stats">
          <span className="stats-number">{tasks.length}</span>
          <p className="stats-label">Total Tasks</p>
        </div>
        <div className="task-stats">
          <span className="stats-number">{pendingTasks}</span>
          <p className="stats-label">Pending</p>
        </div>
        <div className="task-stats">
          <span className="stats-number">{completedTasks}</span>
          <p className="stats-label">Completed</p>
        </div>
      </div>

      <TasksManager tasks={tasks} onAddTask={onAddTask} />
      
      <TaskList 
        tasks={tasks} 
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      >
        <TaskFooter />
      </TaskList>
    </div>
  );
}

export default App;
