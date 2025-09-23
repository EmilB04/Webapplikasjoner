"use client";

import { useActionState, useOptimistic, useState, useTransition } from "react";
import TaskList from "./TaskList";
import type { Task } from "./types";
import TaskFooter from "./TaskFooter";

import TaskActionStateForm from "./TaskActionStateForm";
import { createTaskActionState, isValidTask } from "@/actions/task-actions";

export type ActionState = {
  success: boolean;
  data: any;
  message: string;
  fields: Partial<Task>;
};

export default function TaskActionStatePage() {
  const [, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const data = {
        id: crypto.randomUUID(),
        name: formData.get("name"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        completed: false,
      };
      if (isValidTask(data)) {
        handleTaskCreated?.(data);
      }
      const result = await createTaskActionState(prevState, formData);
      return result;
    },
    {
      success: false,
      data: [],
      fields: {},
      message: "",
    }
  );

  const [optimisticTasks, addOptimisticTasks] = useOptimistic<Task[], Task>(
    state.data,
    (state, newTask) => [...state, newTask]
  );

  const handleTaskCreated = async (task: Task) => {
    startTransition(async () => {
      try {
        addOptimisticTasks(task);
      } catch (error) {
        console.warn("Error creating task:", error);
      }
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskList
        tasks={optimisticTasks}
        form={<TaskActionStateForm state={state} onSubmit={formAction} />}
        onRemoveTask={() => console.log("Remove task")}
      >
        <TaskFooter />
      </TaskList>
    </div>
  );
}
