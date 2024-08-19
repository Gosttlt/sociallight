import { TasksCulumnType } from "../TaskColumn";

export type TasksCategoryType = {
  createdAt?: string;
  updatedAt?: string;
  id: string;
  name: string;
  order: number;
  columns: TasksCulumnType[];
};

export type TasksCategoriesResponseType = {
  taskCategories: TasksCategoryType[];
};

export type TasksCategoryResponseType = {
  taskCategory: TasksCategoryType;
};
