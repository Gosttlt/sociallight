import { TaskVariantType } from "@/4Features/Tasks/Card/RemoveCard/ui/RemoveCard.types";
import type { FC } from "react";

export type CreateTaskInputComponentType = FC<CreateTaskInputProps>;

export type CreateTaskInputProps = {
  className?: string;
  columnId: string;
  onChangeName: (id: string) => void;
  variant: TaskVariantType;
};
