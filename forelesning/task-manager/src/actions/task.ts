import type { Task } from "@/components/types";

export async function saveTask(task: Task) {
  const mappedData = {
    title: task.name,
    description: task.description,
    dueDate: task.dueDate,
    completed: task.completed ?? false,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(mappedData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to save task");
  }

  console.log("Response:", response.status);

  const data = await response.json();
  console.log("Response data:", data);
  return data;
}
