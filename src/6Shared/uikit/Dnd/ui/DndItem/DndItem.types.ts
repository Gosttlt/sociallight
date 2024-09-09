import type { DragEvent, FC, ReactNode } from "react";
import { DndDirectionType } from "../Dnd.types";

export type DndItemComponentType = FC<DndItemProps>;

export type DndItemDataType = { id: string; order: number };

export type DndItemProps = {
  children?: ReactNode;
  className?: string;
  onDragStart?: (e: DragEvent, card: DndItemDataType) => void;
  onDragOver?: (e: DragEvent, card: DndItemDataType) => void;
  onDragEnd?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent, card: DndItemDataType) => void;
  data: DndItemDataType;
  direction?: DndDirectionType;
  position?: "left" | "right" | "top" | "bottom";
  sharedClass?: string;
  wrapperId?: string;
  isTargetContainer?: boolean;
  overCard?: DndItemDataType | null;
  reverse?: boolean;
};
