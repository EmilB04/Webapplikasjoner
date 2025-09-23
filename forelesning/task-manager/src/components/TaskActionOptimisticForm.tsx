"use client";

import { isValidTask } from "@/actions/task-actions";
import type { Task } from "./types";
import { TaskSubmitButton } from "./TaskSubmitButton";

interface TaskActionFormProps {
  onTaskCreated: (task: Task) => void | Promise<void>;
}

export default function TaskActionOptimisticForm({
  onTaskCreated,
}: TaskActionFormProps) {
  const handleSubmit = (formData: FormData) => {
    const data = {
      id: crypto.randomUUID(),
      name: formData.get("name"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
      completed: false,
    };
    if (isValidTask(data)) {
      onTaskCreated?.(data);
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" placeholder="Task name" required />
      <textarea name="description" placeholder="Beskrivelse" />
      <input name="dueDate" type="date" placeholder="Forfallsdato" required />
      <TaskSubmitButton />
    </form>
  );
}
