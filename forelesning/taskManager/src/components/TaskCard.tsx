import TaskTitle from './TaskTitle';

import TaskItem from './TaskItem';
import type { Task } from '../types';

// <TaskCard task={dataKommerHer} />

export default function TaskCard({ task }: { task: Task }) {
  const { title } = task;

  const onActionInTaskItem = (task: Task, time: number) => {
    console.log(task.id, time);
  };

  return (
    <section className="task">
      <TaskTitle title={title} />
      <TaskItem task={task} onAction={onActionInTaskItem} />
    </section>
  );
}
