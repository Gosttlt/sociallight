export type TaskType = {
  createdAt: string;
  description: string;
  id: string;
  isCompleted: boolean;
  name: string;
  priority: PriorityTaskEnum;
  updatedAt: string;
};

export enum PriorityTaskEnum {
  HIGH = "high",
  LOW = "low",
  MEDIUM = "medium",
}
