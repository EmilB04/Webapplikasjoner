"use client";

import { createContext, Suspense, use, useState } from "react";
import type { Task } from "./types";
import { ErrorBoundary } from "react-error-boundary";

export interface TaskContext {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContext | undefined>(undefined);

export function TaskProvider({
  children,
  initialTaskPromise,
}: {
  children: React.ReactNode;
  initialTaskPromise: Promise<Task[]>;
}) {
  const initialTask = use(initialTaskPromise);
  const [tasks, setTasks] = useState<Task[]>(initialTask);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}
