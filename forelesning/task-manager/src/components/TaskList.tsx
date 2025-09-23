"use client";

import TaskCard from "./TaskCard";
import type { Task } from "./TaskItem";

export default function TaskList({
  children,
  form,
  tasks,
  onRemoveTask,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
  tasks: Task[];
  onRemoveTask: (task: Task) => void;
}) {
  const handleTaskLog = (task: Task) => {
    console.log("Logging task:", task);
    // Call the onRemoveTask prop when a task is removed
    onRemoveTask(task);
  };

  console.log(JSON.stringify(tasks, null, 2));

  return (
    <section>
      {form}
      <h2>Task List</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} actionFn={handleTaskLog} />
      ))}
      {children}
    </section>
  );
}
