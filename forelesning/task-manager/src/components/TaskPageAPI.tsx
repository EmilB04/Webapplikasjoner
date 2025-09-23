"use client";

import TaskFooter from "./TaskFooter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task } from "./types";

import { useEffect, useState } from "react";

export default function TaskPageAPI() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = (await response.json()) as {
          id: number;
          title: string;
          completed: boolean;
        }[];
        setTasks(
          data.slice(0, 10).map(({ id, title }) => ({
            id: id.toString(),
            description: "",
            name: title,
            dueDate: new Date(),
          }))
        );
      } catch (error) {
        setError(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const taskCreationHandler = (task: Task) => {
    // Handle task creation logic here
    console.log(task);
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTaskHandler = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Task Page</h1>
      <TaskList
        form={<TaskForm onCreate={taskCreationHandler} />}
        tasks={tasks}
        onRemoveTask={removeTaskHandler}
      >
        <TaskFooter />
      </TaskList>
    </div>
  );
}
