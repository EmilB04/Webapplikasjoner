"use client";

import { useEffect, useState } from "react";
import type { Task } from "../types";
import { listTasks } from "@/services/tasks/api";

const isClient = typeof window !== "undefined";

export default function TaskApiPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isClient) return;
      const url = new URL(window.location.href);
      const params = url.searchParams;
      const query = Object.fromEntries(params.entries().filter(([_, v]) => v));
      const result = await listTasks(query);
      if (result.success && result.data) {
        setTasks(result.data);
      }
    };
    fetchTasks();
  }, []);

  return <div>{JSON.stringify(tasks)}</div>;
}
