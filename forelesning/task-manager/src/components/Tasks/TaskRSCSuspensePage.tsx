import { Suspense } from "react";
import TaskListRSCPage from "./TaskListPageRSC";

import type { RequestInfo } from "rwsdk/worker";

export default async function TaskRSCSuspensePage(props: RequestInfo) {
  return (
    <main>
      <h1>Task List</h1>
      <Suspense
        fallback={
          <div className="loading">
            <p className="text">Loading...</p>
          </div>
        }
      >
        <TaskListRSCPage {...props} />
      </Suspense>
    </main>
  );
}
