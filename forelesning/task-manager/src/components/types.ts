export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  completed?: boolean;
}
