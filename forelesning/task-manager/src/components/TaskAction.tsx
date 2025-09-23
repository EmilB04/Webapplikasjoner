"use client";

import type { Task } from "./TaskItem";

export default function TaskAction({
  task,
  onAction,
}: {
  task: Task;
  onAction: (task: Task) => void;
}) {
  return (
    <button onClick={() => onAction(task)}>
      Task action for {task.id.slice(0, 5)}...
    </button>
  );
}
