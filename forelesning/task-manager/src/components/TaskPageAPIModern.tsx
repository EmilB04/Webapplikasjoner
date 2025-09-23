"use client";

import TaskFooter from "./TaskFooter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task } from "./types";

import { use, useState } from "react";

export default function TaskPageAPIModern({
  todosPromise,
}: {
  todosPromise: Promise<Task[]>;
}) {
  const initialTask = use(todosPromise);

  const [tasks, setTasks] = useState<Task[]>(initialTask);

  const taskCreationHandler = (task: Task) => {
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
