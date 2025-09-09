import type { Task } from '../types';

export default function TaskItem({
  task,
  onAction,
}: {
  task: Task;
  onAction: (task: Task, time: number) => void;
}) {
  // Her er funksjone som skal trigges
  // Ny oppgave er å ta inn en prop i TaskItem som kan trigges sammen med funksjone her
  const onTaskClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked', e);
    onAction(task, new Date().getMilliseconds());
  };

  return (
    <section>
      <h2>Task item</h2>
      {/* Knapp her */}
      <button onClick={onTaskClick}>Task logger button</button>
    </section>
  );
}
