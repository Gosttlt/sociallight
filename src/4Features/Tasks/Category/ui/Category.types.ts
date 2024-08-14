import type { DragEventHandler, FC } from "react";

export type CategoryComponentType = FC<CategoryProps>;

export type CategoryProps = {
  className?: string;
  isActive: boolean;
  name: string;
  onClick: () => void;
  id: string;
  onDragStart?: DragEventHandler<HTMLDivElement>;
  onDragOver?: DragEventHandler<HTMLDivElement>;
  onDragLeave?: DragEventHandler<HTMLDivElement>;
  onDrop?: DragEventHandler<HTMLDivElement>;
};
