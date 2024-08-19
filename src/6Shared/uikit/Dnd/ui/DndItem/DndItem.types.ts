import type { DragEvent, FC, ReactNode } from "react";

export type DndItemComponentType = FC<DndItemProps>;

export type DndItemDataType = { id: string; order: number };

export type DndItemProps = {
  children?: ReactNode;
  className?: string;
  isDragging?: boolean;
  onDragStart?: (e: DragEvent, card: DndItemDataType) => void;
  onDragOver?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent, card: DndItemDataType) => void;
  data: DndItemDataType;
};
