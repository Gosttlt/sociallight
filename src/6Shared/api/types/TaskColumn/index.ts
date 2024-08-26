import { TaskType } from "../Task";

export type TasksCulumnType = {
  createdAt?: string;
  updatedAt?: string;
  id: string;
  name: string;
  order: number;
  categoryId: string;
  tasks: TaskType[];
};

export type TasksCulumnResponseType = {
  tasksColumns: TasksCulumnType[];
};
