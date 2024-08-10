import { TaskVariantType } from "@/6Shared/api/types/Task";
import type { FC } from "react";

export type CreateTaskInputComponentType = FC<CreateTaskInputProps>;

export type CreateTaskInputProps = {
  className?: string;
  parentId?: string | null;
  onChangeFocus: (id: string) => void;
  variant: TaskVariantType;
};
