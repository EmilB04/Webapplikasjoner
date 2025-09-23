import { listTasks } from "@/services/tasks/api";
import { type RequestInfo } from "rwsdk/worker";
import TaskActionForm from "./TaskActionForm";

const delayFn = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetcher = async (request: Request, logging = true) => {
  const params = new URL(request.url).searchParams;
  const query = Object.fromEntries(
    Array.from(params.entries()).filter(
      ([key, v]) => v != null && v !== "" && !key.startsWith("__rsc")
    )
  );

  const result = await listTasks(query);
  await delayFn(2000);

  console.log("Fetcher called with query:", query);

  if (logging) {
    console.log("RSC fetcher result:", result.data?.length ?? 0);
  }

  return result.data;
};

export default async function TaskListRSCPage(props: RequestInfo) {
  const data = await fetcher(props.request);

  return (
    <section>
      <article>{JSON.stringify(data)}</article>
      <TaskActionForm />
    </section>
  );
}
