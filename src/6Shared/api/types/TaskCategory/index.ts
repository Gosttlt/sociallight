import { TasksCulumnType } from "../TaskColumn";

export type TasksCategoryType = {
  createdAt?: string;
  updatedAt?: string;
  id: string;
  name: string;
  columns: TasksCulumnType[];
};

export type TasksCategoriesResponseType = {
  taskCategories: TasksCategoryType[];
};

export type TasksCategoryResponseType = {
  taskCategory: TasksCategoryType;
};
