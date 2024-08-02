import { TaskType } from "../Task";

export type TasksCulumnType = {
  createdAt?: string;
  updatedAt?: string;
  id: string;
  name: string;
  tasks: TaskType[];
};

export type TasksCulumnTypeResponse = {
  tasksColumns: TasksCulumnType[];
};
