import type { FC } from "react";

export type CategoryComponentType = FC<CategoryProps>;

export type CategoryProps = {
  className?: string;
  isActive: boolean;
  name: string;
  onClick: () => void;
};
