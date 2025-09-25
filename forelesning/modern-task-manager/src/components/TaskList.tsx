import type React from 'react';
import type { Task } from '../types';
import TaskCard from './TaskCard';

export default function TaskList({ 
  tasks, 
  children,
  onToggleTask,
  onDeleteTask
}: { 
  tasks: Task[];
  children: React.ReactNode;
  onToggleTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}) {
  return (
    <section className="task-section">
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
      {children}
    </section>
  );
}

// <TaskList tasks={} />
