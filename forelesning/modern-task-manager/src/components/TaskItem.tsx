import type { Task } from '../types';

export default function TaskItem({
  task,
  onAction,
  onToggleTask,
  onDeleteTask
}: {
  task: Task;
  onAction: (task: Task, time: number) => void;
  onToggleTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}) {
  const onTaskClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked', e);
    onAction(task, new Date().getMilliseconds());
  };

  const onCompleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onToggleTask) {
      onToggleTask(task.id);
    }
  };

  const onDeleteTaskClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDeleteTask) {
      onDeleteTask(task.id);
    }
  };

  return (
    <>
      <button 
        onClick={onCompleteTask}
        className={task.completed ? "completed" : "pending"}
        title={task.completed ? "Mark as pending" : "Mark as completed"}
      >
        {task.completed ? "↺" : "✓"}
      </button>
      <button 
        onClick={onDeleteTaskClick}
        title="Delete task"
        className="delete"
      >
        ✕
      </button>
    </>
  );
}
