"use client";

import type { Task } from "@/components/types";
import { useState } from "react";

export function useTask(initialTask: Partial<Task> = {}) {
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    dueDate: new Date(),
    ...initialTask,
  });

  const validateTask = (task: Task) => {
    if (!task.name || !task.description) {
      return false;
    }
    return true;
  };

  const updateTask = (value: Partial<Task>) => {
    const id = crypto.randomUUID();
    setTask((prev) => ({ ...prev, ...value, id }));
  };

  return { task, updateTask, validateTask };
}
