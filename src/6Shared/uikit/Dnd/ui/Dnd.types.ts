import type { FC, ReactNode } from "react";

export type DndComponentType = FC<DndProps>;

export type DirectionType = "direcrionX" | "direcrionY";

export type DndProps = {
  children?: ReactNode;
  className?: string;
  direction: DirectionType;
};
