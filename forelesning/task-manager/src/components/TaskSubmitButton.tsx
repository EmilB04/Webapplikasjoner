import { useFormStatus } from "react-dom";

export function TaskSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Oppretter..." : "Opprett task"}
    </button>
  );
}
