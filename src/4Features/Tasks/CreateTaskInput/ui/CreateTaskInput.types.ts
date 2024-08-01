import type { FC } from "react";

export type CreateTaskInputComponentType = FC<CreateTaskInputProps>;

export type CreateTaskInputProps = {
  className?: string;
  onChangeName: (id: string) => void;
};
