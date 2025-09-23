"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TaskPageAPIModern from "./TaskPageAPIModern";
import type { Task } from "./types";

const delayFn = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const rejectFn = (ms: number) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error("Failed")), ms));

const getTodos = async (reject = false): Promise<Task[]> => {
  await delayFn(2000);
  if (reject) {
    await rejectFn(2000);
  }
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = (await response.json()) as {
    id: number;
    title: string;
    completed: boolean;
  }[];

  return data.slice(0, 10).map(({ id, title }) => ({
    id: id.toString(),
    description: "",
    name: title,
    dueDate: new Date(),
  }));
};

export default function TaskModern() {
  const todosPromise = getTodos(true);
  return (
    <ErrorBoundary fallback={<p>Noe gikk galt</p>}>
      <Suspense fallback={<p>Laster...</p>}>
        <TaskPageAPIModern todosPromise={todosPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
