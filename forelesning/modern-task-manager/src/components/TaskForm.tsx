'use client'

import React, { useState } from "react"
import type { Task } from "../types"

type TaskFormProps = {
    onTaskCreate: (task: Task) => void
}

export default function TaskForm(props: TaskFormProps) {
    const { onTaskCreate } = props
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [taskItem, setTaskItem] = useState<Task>({
        id: "",
        title: "",
        description: "",
        dueDate: new Date()
    })

    const updateTask = (value: Partial<Task>) => {
        const id = crypto.randomUUID()
        setTaskItem((prev) => ({ ...prev, ...value, id }))

        // Clear errors when user starts typing
        if (errors && Object.keys(errors).length > 0) {
            const newErrors = { ...errors }
            Object.keys(value).forEach(key => {
                delete newErrors[key]
            })
            setErrors(newErrors)
        }
    }

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {}

        if (!taskItem.title.trim()) {
            newErrors.title = "Title is required"
        } else if (taskItem.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters"
        }

        if (!taskItem.description.trim()) {
            newErrors.description = "Description is required"
        } else if (taskItem.description.length < 10) {
            newErrors.description = "Description must be at least 10 characters"
        }

        const selectedDate = new Date(taskItem.dueDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selectedDate < today) {
            newErrors.dueDate = "Due date cannot be in the past"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500))

            onTaskCreate(taskItem)

            // Reset form after successful submission
            setTaskItem({
                id: "",
                title: "",
                description: "",
                dueDate: new Date()
            })

        } catch (error) {
            console.error('Error creating task:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDateForInput = (date: Date | string) => {
        const taskDate = typeof date === 'string' ? new Date(date) : date
        return taskDate.toISOString().split('T')[0]
    }

    return (
        <form onSubmit={onCreateTask}>
            <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={taskItem.title}
                    onChange={e => updateTask({ title: e.target.value })}
                    placeholder="Enter a clear, descriptive title..."
                    className={errors.title ? 'error' : ''}
                    disabled={isSubmitting}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Task Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={taskItem.description}
                    onChange={(e) => updateTask({ description: e.target.value })}
                    placeholder="Provide detailed information about this task..."
                    className={errors.description ? 'error' : ''}
                    disabled={isSubmitting}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formatDateForInput(taskItem.dueDate)}
                    onChange={(e) => updateTask({ dueDate: new Date(e.target.value) })}
                    className={errors.dueDate ? 'error' : ''}
                    disabled={isSubmitting}
                />
                {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Task...' : 'Create Task'}
            </button>
        </form>
    )
}