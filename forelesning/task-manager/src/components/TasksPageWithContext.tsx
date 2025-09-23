"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TaskProvider } from "./TaskContext";
import type { Task } from "./types";

export const delayFn = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const rejectFn = (ms: number) =>
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

// NB: Rekkefølgen her er viktig ellers fanger ikke Suspense og Error opp feilen
export default function TasksPageWithContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const todosPromise = getTodos();
  return (
    <ErrorBoundary fallback={<p>Noe gikk galt</p>}>
      <Suspense fallback={<p>Laster...</p>}>
        <TaskProvider initialTaskPromise={todosPromise}>
          <main>{children}</main>
        </TaskProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
