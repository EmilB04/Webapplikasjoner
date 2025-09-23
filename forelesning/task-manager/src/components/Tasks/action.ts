"use server";

import { requestInfo } from "rwsdk/worker";
import { fetcher } from "./TaskListPageRSC";

export const onClickAction = async () => {
  const { request } = requestInfo;
  await fetcher(request, false);
  console.log("Refetched data:", new Date().toISOString());
};
