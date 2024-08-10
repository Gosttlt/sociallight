import type { FC, ReactNode } from "react";

export type TaskColumnsComponentType = FC<TaskColumnsProps>;

export type TaskColumnsProps = {
  children?: ReactNode;
  className?: string;
};
