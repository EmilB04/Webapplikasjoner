"use client";

import { useState } from "react";
import type { Task } from "./types";

export default function TaskForm({
  onCreate,
}: {
  onCreate?: (task: Task) => void;
}) {
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    dueDate: new Date(),
  });

  const updateTask = (value: Partial<Task>) => {
    const id = crypto.randomUUID();
    setTask((prev) => ({ ...prev, ...value, id }));
  };

  const onCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle task creation logic here
    // Validate task
    if (!task.name || !task.description) {
      alert("Please fill in all fields");
      return;
    }
    onCreate?.(task);
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
