"use client";

import { use } from "react";
import { TaskContext } from "./TaskContext";

export default function TaskFooterContext() {
  const context = use(TaskContext);
  return (
    <footer>
      <p>Task Manager &copy; {new Date().getFullYear()}</p>
      <p>Du har {context?.tasks.length} tasks</p>
    </footer>
  );
}
