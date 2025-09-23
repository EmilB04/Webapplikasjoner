"use client";

import { saveTask } from "@/actions/task";
import type { Task } from "./types";

const validations = {
  id: (value: string) => value.length > 0,
  name: (value: string) => value.length > 0,
  description: (value: string) => value.length > 0,
  dueDate: (value: string) =>
    new Date(value) && !isNaN(new Date(value).getTime()),
  completed: (value: boolean) => typeof value === "boolean",
};

const isValidTask = (task: unknown): task is Task => {
  const isObject = typeof task === "object";
  if (!task) return false;
  if (!isObject) return false;
  const hasKeys =
    isObject && Object.keys(validations).every((key) => key in task);

  if (!hasKeys) return false;

  for (const entries of Object.entries(task)) {
    const [key, value] = entries;
    const validateFn = validations[key as keyof typeof validations] as (
      value: unknown
    ) => boolean;
    if (validateFn(value)) continue;
    return false;
  }
  return true;
};

export default function TaskActionForm() {
  async function createTask(formData: FormData) {
    "use server";

    // Hente data fra form "name" attr
    const name = formData.get("name");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");

    const data = {
      id: crypto.randomUUID(),
      name,
      description,
      dueDate,
      completed: false,
    };

    // Validere at dette er en Task og har riktig verdier
    if (!isValidTask(data)) {
      return;
    }
    // Lagre i database
    await saveTask(data);
  }

  return (
    <form action={createTask}>
      <input name="name" type="text" placeholder="Task name" required />
      <textarea name="description" placeholder="Beskrivelse" />
      <input name="dueDate" type="date" placeholder="Forfallsdato" required />
      <button type="submit">Opprett task</button>
    </form>
  );
}
