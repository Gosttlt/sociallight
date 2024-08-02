import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";
import type { FC } from "react";

export type TaskColumnComponentType = FC<TaskColumnType>;
export type TaskColumnType = { data: TasksCulumnType };
