"use client";

import TaskFooterContext from "./TaskFooterContext";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import { useTask } from "./useTask";

export default function TaskPageAPIModernContext() {
  const {
    tasks,
    addTask: taskCreationHandler,
    removeTask: removeTaskHandler,
  } = useTask();

  return (
    <div>
      <h1>Task Page</h1>
      <TaskList
        form={<TaskForm onCreate={taskCreationHandler} />}
        tasks={tasks}
        onRemoveTask={removeTaskHandler}
      >
        <TaskFooterContext />
      </TaskList>
    </div>
  );
}
