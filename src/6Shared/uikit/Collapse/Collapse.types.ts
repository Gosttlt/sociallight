import type { DetailedReactHTMLElement, FC, ReactNode } from "react";

export type CollapseComponentType = FC<CollapseProps>;

export type CollapseProps = {
  children: string | ReactNode;
  className?: string;
  toggleBtn: any;
};
