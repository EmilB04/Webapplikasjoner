"use client";

import { use } from "react";
import { TaskContext } from "./TaskContext";

export function useTask() {
  const context = use(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
