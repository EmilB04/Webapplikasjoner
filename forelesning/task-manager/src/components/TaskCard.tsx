"use client";

import TaskItem, { type Task } from "./TaskItem";
import TaskAction from "./TaskAction";

export default function TaskCard({
  task,
  actionFn,
}: {
  task: Task;
  actionFn: (task: Task) => void;
}) {
  return (
    <section>
      <TaskItem task={task} />
      <TaskAction task={task} onAction={actionFn} />
    </section>
  );
}
