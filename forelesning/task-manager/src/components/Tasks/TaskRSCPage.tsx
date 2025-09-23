export default async function TaskRSCPage({ request }: { request?: Request }) {
  const data = await fetch(
    new URL(request?.url || "").origin + "/api/tasks"
  ).then((res) => res.json());

  return <div>{JSON.stringify(data)}</div>;
}
