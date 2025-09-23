"use client";

export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date | string;
}

export default function TaskItem({ task }: { task: Task }) {
  const date =
    typeof task.dueDate === "string" ? new Date(task.dueDate) : task.dueDate;
  return (
    <article>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>
    </article>
  );
}
