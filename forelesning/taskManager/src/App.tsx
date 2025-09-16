import './App.css';
import TaskFooter from './components/TaskFooter';

import TaskList from './components/TaskList';
import type { Task } from './types';

const tasks: Task[] = [
  {
    id: '1234',
    title: 'My Title Works',
    description: 'My description',
    dueDate: new Date(),
  },
  {
    id: '1235',
    title: 'My Title Works',
    description: 'My description',
    dueDate: new Date(),
  },
];

function App() {
  return (
    <div>
      <h1>Hey</h1>
      {/* <TaskCard task={task} /> */}
      <TaskList tasks={tasks} />
      <TaskFooter text='Dette er footeren - custom tekst' />
    </div>
  );
}

export default App;
