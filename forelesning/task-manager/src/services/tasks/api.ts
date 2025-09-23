import type { Task } from "@/components/types";

type TaskParams = {
  search?: string;
  status?: "completed";
};

type ResponseData<T> = {
  data: T | null;
  success: boolean;
};

export function listTasks(params: TaskParams): Promise<ResponseData<Task[]>> {
  const query = new URLSearchParams(Object.entries(params)).toString();
  const fetchUrl = new URL("http://localhost:5173/api/tasks");
  if (query) {
    fetchUrl.search = query;
  }

  console.log("Fetching tasks with URL:", fetchUrl.href);

  return fetch(fetchUrl.href, {
    cache: "no-store",
  })
    .then((res) => res.json() as Promise<ResponseData<Task[]>>)
    .catch((err) => {
      console.error("Error fetching tasks:", err);
      return { data: [], success: false };
    });
}

export function getTaskById(id: string): Promise<ResponseData<Task>> {
  return fetch(`/api/tasks/${id}`)
    .then((res) => res.json() as Promise<ResponseData<Task>>)
    .catch((err) => {
      console.error("Error fetching task:", err);
      return { data: null, success: false };
    });
}
