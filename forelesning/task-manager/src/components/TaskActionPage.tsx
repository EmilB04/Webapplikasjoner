"use client";

import { useOptimistic, useState, useTransition } from "react";
// import TaskActionForm from "./TaskActionForm";
// import TaskActionTransitionForm from "./TaskActionTransitionForm";
import TaskList from "./TaskList";
import type { Task } from "./types";
import TaskFooter from "./TaskFooter";
import TaskActionOptimisticForm from "./TaskActionOptimisticForm";
import { createTaskTask } from "@/actions/task-actions";

export default function TaskActionPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPending, startTransition] = useTransition();

  const [optimisticTasks, addOptimisticTasks] = useOptimistic<Task[], Task>(
    tasks,
    (state, newTask) => [...state, newTask]
  );

  const handleTaskCreated = async (task: Task) => {
    console.log("handleTaskCreated", task);

    const taskData = {
      ...task,
      dueDate:
        typeof task.dueDate === "string"
          ? new Date(task.dueDate)
          : task.dueDate,
    };

    startTransition(async () => {
      try {
        addOptimisticTasks(taskData);
        const newTask = await createTaskTask(taskData);
        console.log("transitionTask", newTask);
        // You must wrap any state updates after any async requests in another startTransition to mark them as Transitions. This is a known limitation that we will fix in the future (see Troubleshooting).
        startTransition(() => {
          setTasks((prev) => [...prev, newTask]);
        });
      } catch (error) {
        console.warn("Error creating task:", error);
      }
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {/* <TaskActionForm /> */}
      {/* <TaskActionTransitionForm onTaskCreated={handleTaskCreated} /> */}

      <TaskList
        tasks={optimisticTasks}
        form={<TaskActionOptimisticForm onTaskCreated={handleTaskCreated} />}
        onRemoveTask={() => console.log("Remove task")}
      >
        <TaskFooter />
      </TaskList>
    </div>
  );
}
