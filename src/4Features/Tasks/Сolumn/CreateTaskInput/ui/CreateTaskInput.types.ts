import type { FC } from "react";

export type CreateTaskInputComponentType = FC<CreateTaskInputProps>;

export type CreateTaskInputProps = {
  className?: string;
  columnId: string;
  onChangeName: (id: string) => void;
};
