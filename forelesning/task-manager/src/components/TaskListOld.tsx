"use client";

import TaskCard from "./TaskCard";
import type { Task } from "./TaskItem";
import { TASKS } from "./tasks";

export default function TaskList({
  children,
  form,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
}) {
  const handleTaskLog = (task: Task) => {
    console.log("Logging task:", task);
  };

  return (
    <section>
      {form}
      <h2>Task List</h2>
      {TASKS.map((task) => (
        <TaskCard key={task.id} task={task} actionFn={handleTaskLog} />
      ))}
      {children}
    </section>
  );
}
