import TaskTitle from './TaskTitle';

import TaskItem from './TaskItem';
import type { Task } from '../types';

// <TaskCard task={dataKommerHer} />

export default function TaskCard({ 
  task,
  onToggleTask,
  onDeleteTask 
}: { 
  task: Task;
  onToggleTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}) {
  const { title, description, dueDate, completed } = task;

  const onActionInTaskItem = (task: Task, time: number) => {
    console.log(task.id, time);
  };

  const formatDate = (date: Date | string) => {
    const taskDate = typeof date === 'string' ? new Date(date) : date;
    return taskDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <li className={`task-card ${completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-content">
          <TaskTitle title={title} />
          <p>{description}</p>
          <div className="due-date">
            📅 Due: {formatDate(dueDate)}
          </div>
          {completed && <div className="status">Completed</div>}
        </div>
        <div className="task-actions">
          <TaskItem 
            task={task} 
            onAction={onActionInTaskItem}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      </div>
    </li>
  );
}
