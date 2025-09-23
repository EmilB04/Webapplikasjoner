"use client";

import { onClickAction } from "./action";

export default function TaskActionForm() {
  return (
    <form action={onClickAction}>
      <button>Refetch data</button>
    </form>
  );
}
