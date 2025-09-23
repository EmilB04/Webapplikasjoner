"use client";

import TaskPageAPIModernContext from "./TaskPageAPIModernContext";

import TasksPageWithContext from "./TasksPageWithContext";

export default function TaskModernWithContext() {
  return (
    <TasksPageWithContext>
      <TaskPageAPIModernContext />
    </TasksPageWithContext>
  );
}
