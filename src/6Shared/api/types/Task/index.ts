export type TaskType = {
  createdAt?: string;
  description?: string;
  id: string;
  isCompleted?: boolean;
  name: string;
  priority?: PriorityTaskEnum;
  updatedAt?: string;
  columnId: string;
  order: number;
};

export enum PriorityTaskEnum {
  HIGH = "high",
  LOW = "low",
  MEDIUM = "medium",
}

export type TaskVariantType = "task" | "column" | "category";
