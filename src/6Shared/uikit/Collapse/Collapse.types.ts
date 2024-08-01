import type { FC, ReactNode } from "react";

export type CollapseComponentType = FC<CollapseProps>;

export type CollapseProps = {
  children: string | ReactNode;
  className?: string;
  isOpen: boolean;
  isBlock: boolean;
};
