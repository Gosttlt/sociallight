import type { FC, ReactNode } from "react";
import { DndItemDataType } from "../utils";

export type DndContainerComponentType = FC<DndContainerProps>;

export type DndContainerProps = {
  children?: ReactNode;
  className?: string;
  items: DndItemDataType[];
  sharedId: string;
};
