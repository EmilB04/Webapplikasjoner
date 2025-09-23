import type { Task } from "@/components/types";
import { saveTask } from "./task";
import { delayFn, rejectFn } from "@/components/TasksPageWithContext";

const validations = {
  id: (value: string) => value.length > 0,
  name: (value: string) => value.length > 0,
  description: (value: string) => value.length > 0,
  dueDate: (value: string) => !isNaN(new Date(value).getTime()),
  completed: (value: boolean) => typeof value === "boolean",
};

export const isValidTask = (task: unknown): task is Task => {
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

export async function createTask(formData: FormData) {
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
  return data as Task;
}

export async function createTaskTask(task: Task, reject = false) {
  "use server";

  await delayFn(2000);
  if (reject) {
    await rejectFn(500);
  }

  // Lagre i database
  await saveTask(task);
  return task;
}

export async function createTaskActionState(
  prevState: any,
  data: FormData,
  reject = false,
  invalidData = false
) {
  "use server";

  try {
    await delayFn(2000);
    if (reject) {
      await rejectFn(500);
    }

    const name = data.get("name");
    const description = data.get("description");
    const dueDate = data.get("dueDate");

    const validData = {
      id: crypto.randomUUID(),
      name,
      description,
      dueDate,
      completed: false,
    };

    // Validere at dette er en Task og har riktig verdier
    if (!isValidTask(validData) || invalidData) {
      return {
        success: false,
        message: "Ugyldig taskdata",
        fields: Object.fromEntries(data),
        data: prevState.data,
      };
    }

    // Lagre i database
    await saveTask(validData);
    return {
      success: true,
      message: "Task oppdatert!",
      fields: Object.fromEntries(data),
      data: [...prevState.data, validData],
    };
  } catch (error) {
    return {
      success: false,
      message: "Kunne ikke lage task",
      fields: Object.fromEntries(data),
      data: prevState.data,
    };
  }
}
