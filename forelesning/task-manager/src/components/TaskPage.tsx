"use client";

import TaskFooter from "./TaskFooter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task } from "./types";
import { TASKS } from "./tasks";
import { useState } from "react";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const taskCreationHandler = (task: Task) => {
    // Handle task creation logic here
    console.log(task);
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTaskHandler = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

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
