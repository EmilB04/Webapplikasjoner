"use client";

import type { ActionState } from "./TaskActionStatePage";
import { TaskSubmitButton } from "./TaskSubmitButton";

interface TaskActionFormProps {
  onSubmit: (formData: FormData) => void | Promise<void>;
  state: ActionState;
}

export default function TaskActionStateForm({
  onSubmit,
  state,
}: TaskActionFormProps) {
  const fieldData = state.success ? {} : state.fields;

  return (
    <form action={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Task name"
        required
        defaultValue={fieldData?.name}
      />
      <textarea
        name="description"
        placeholder="Beskrivelse"
        defaultValue={fieldData?.description}
      />
      <input
        name="dueDate"
        type="date"
        placeholder="Forfallsdato"
        required
        defaultValue={
          fieldData?.dueDate
            ? new Date(fieldData.dueDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]
        }
      />
      {state.message && <p>{state.message}</p>}
      <TaskSubmitButton />
    </form>
  );
}
