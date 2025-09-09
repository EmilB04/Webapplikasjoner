import TaskTitle from './TaskTitle';

import TaskItem from './TaskItem';
import type { Task } from '../types';

// <TaskCard task={dataKommerHer} />

export default function TaskCard({ task }: { task: Task }) {
  const { title } = task;
  return (
    <section>
      <TaskTitle title={title} />
      <TaskItem />
    </section>
  );
}
