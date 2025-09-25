import { useState } from "react"
import type { Task } from "../types"
import TaskForm from "./TaskForm"

export default function TasksManager({
    onAddTask,
    tasks
}: {
    onAddTask: (task: Task) => void,
    tasks: Task[]
}) {
    const onTaskCreate = (task: Task) => {
        onAddTask(task)
    }

    return (
        <section className="task-manager">
            <TaskForm onTaskCreate={onTaskCreate}/>
        </section>
    )
}