"use client";

import { useState, useTransition } from "react";
import { createTask } from "@/actions/task-actions";
import type { Task } from "./types";

interface TaskActionFormProps {
  onTaskCreated: (task: Task) => void | Promise<void>;
}

export default function TaskActionTransitionForm({
  onTaskCreated,
}: TaskActionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const handleSubmit = (formData: FormData) => {
    setMessage("");

    startTransition(async () => {
      try {
        const newTask = await createTask(formData);
        console.log("New task created:", newTask);
        if (newTask) {
          setMessage("Task opprettet!");
          onTaskCreated?.(newTask);
        }
      } catch (error) {
        setMessage("Feil ved oppretting av task");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" placeholder="Task name" required />
      <textarea name="description" placeholder="Beskrivelse" />
      <input name="dueDate" type="date" placeholder="Forfallsdato" required />
      <button type="submit">
        {isPending ? "Oppretter..." : "Opprett task"}
      </button>
      <p>{message}</p>
    </form>
  );
}
