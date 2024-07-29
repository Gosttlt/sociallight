import type { FC, ReactNode } from "react";

export type LayoutComponentType = FC<LayoutProps>;

export type LayoutProps = {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
};
