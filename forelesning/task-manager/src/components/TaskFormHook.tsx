"use client";

import type { Task } from "./types";
import { useTask } from "@/hooks/useTask";

export default function TaskFormWithHook({
  onCreate,
}: {
  onCreate?: (task: Task) => void;
}) {
  const { task, updateTask, validateTask } = useTask();

  const onCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateTask(task);
    if (isValid) {
      console.log("Task created:", task);
      onCreate?.(task);
      return;
    }
    alert("Please fill in all fields");
  };

  return (
    <form onSubmit={onCreateTask}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={task.name}
          onChange={(e) => updateTask({ name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={(e) => updateTask({ description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={task.dueDate.toISOString().split("T")[0]}
          onChange={(e) => updateTask({ dueDate: new Date(e.target.value) })}
        />
      </div>
      <button type="submit">Create task</button>
    </form>
  );
}
