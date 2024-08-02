import type { FC, ReactNode } from "react";

export type AddColumnComponentType = FC<AddColumnProps>;

export type AddColumnProps = {
  children?: ReactNode;
  className?: string;
};
