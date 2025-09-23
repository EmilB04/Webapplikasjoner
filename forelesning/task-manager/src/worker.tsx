import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";

import { setCommonHeaders } from "./app/headers";
import TaskList from "./components/TaskList";
import TaskFooter from "./components/TaskFooter";
import TaskForm from "./components/TaskForm";
import type { Task } from "./components/types";
import TaskPage from "./components/TaskPage";
import TaskPageAPI from "./components/TaskPageAPI";
import TaskPageAPIModern from "./components/TaskPageAPIModern";

import TaskModern from "./components/TaskSuspense";

import TaskModernWithContext from "./components/TaskPageContext";
import TaskActionPage from "./components/TaskActionPage";
import TaskActionStatePage from "./components/TaskActionStatePage";
import TaskFormWithHook from "./components/TaskFormHook";
import TaskApiPage from "./components/Tasks/TaskApiPage";
import TaskRSCSuspensePage from "./components/Tasks/TaskRSCSuspensePage";
import TaskRSCPage from "./components/Tasks/TaskRSCPage";

export interface Env {}

export type AppContext = {};

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);

const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 7);

const today = new Date();

export const tasks: Task[] = [
  {
    id: "1",
    name: "Future Task 1",
    description: "Description for Task 1",
    completed: false,
    dueDate: futureDate,
  },
  {
    id: "2",
    name: "Past Task 2",
    description: "Description for Task 2",
    completed: true,
    dueDate: pastDate,
  },
  {
    id: "3",
    name: "Today Task 3",
    description: "Description for Task 3",
    completed: false,
    dueDate: today,
  },
];

export default defineApp([
  setCommonHeaders(),
  route("/api/tasks", ({ request }) => {
    const { search, status } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    let filteredTasks = tasks;

    if (search) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    console.log("API /api/tasks called with params:", { search, status });

    if (status === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    }

    return new Response(
      JSON.stringify({ success: true, data: filteredTasks }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }),
  route("/api/tasks/:id", ({ params }) => {
    const { id } = params;

    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return new Response(
        JSON.stringify({ success: false, message: "Task not found" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: task }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }),
  render(Document, [
    route("/", () => {
      // OBS: Ikke lov da vi har server
      // const taskCreationHandler = (task: Task) => {
      //   // Handle task creation logic here
      // };

      return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          {/* <TaskList form={<TaskForm onCreate={taskCreationHandler} />}>
            <TaskFooter />
          </TaskList> */}
          {/* <TaskPage /> */}
          {/* <TaskPageAPI /> */}
          {/* <TaskModern /> */}
          {/* <TaskModernWithContext /> */}
          {/* <TaskActionPage /> */}
          <TaskFormWithHook />
          {/* <TaskActionStatePage /> */}
        </div>
      );
    }),
    route("/tasks", TaskApiPage),
    route("/tasks-rsc", TaskRSCPage),
    route("/tasks-suspense", TaskRSCSuspensePage),
  ]),
]);
