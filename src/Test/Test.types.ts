import type { FC, ReactNode } from "react";

export type TestComponentType = FC<TestProps>;

export type TestProps = {
  children?: ReactNode;
  className?: string;
};
