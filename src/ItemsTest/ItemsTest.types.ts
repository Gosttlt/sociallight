import type { FC, ReactNode } from "react";

export type ItemsTestComponentType = FC<ItemsTestProps>;

export type ItemsTestProps = {
  children?: ReactNode;
  className?: string;
};
