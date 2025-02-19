import { create } from "zustand";
import { DndItemDataType } from "../Dnd/utils";

type CoordsType = { x: number; y: number };

interface DndState {
  isStartAfterDropAnimation: boolean;
  setStatusAfterDropAnimation: (coords: boolean) => void;

  isCursorStartPositionFromOverCard: boolean;
  setCursorPositionFromOverCard: (
    isCursorStartPositionFromOverCard: boolean
  ) => void;

  cursorCoords: CoordsType | null;
  setCursorCoords: (coords: CoordsType | null) => void;

  isInContainer: boolean;
  setInContainer: (isInContainer: boolean) => void;

  sharedContainerId: string | null;
  setSharedContainerId: (id: string | null) => void;

  isDragNodeFix: boolean;
  setDragNodeFix: (state: boolean) => void;

  isDragStart: boolean;
  setDragStart: (state: boolean) => void;

  dragNode: HTMLDivElement | null;
  setDragNode: (node: HTMLDivElement | null) => void;

  dragNodeRect: DOMRect | null;
  setDragNodeRect: (nodeRect: DOMRect | null) => void;

  diffDragNodeAndCursor: CoordsType | null;
  setDiffDragNodeAndCursor: (coords: CoordsType | null) => void;

  dragCard: DndItemDataType | null;
  setDragCard: (dragCard: DndItemDataType | null) => void;

  overNode: HTMLDivElement | null;
  setOverNode: (node: HTMLDivElement) => void;

  overCard: DndItemDataType | null;
  setOverCard: (overCard: DndItemDataType | null) => void;

  fromContainerNode: HTMLDivElement | null;
  setFromContainerNode: (node: HTMLDivElement | null) => void;

  toContainerNode: HTMLDivElement | null;
  setToContainerNode: (node: HTMLDivElement) => void;

  overContainerNode: HTMLDivElement | null;
  setOverContainerNode: (node: HTMLDivElement) => void;

  dndItemsFrom: DndItemDataType[] | null;
  setDndItemsFrom: (items: DndItemDataType[] | null) => void;

  dndItemsTo: DndItemDataType[] | null;
  setDndItemsTo: (items: DndItemDataType[]) => void;
}

export const useDndStore = create<DndState>((set) => ({
  isStartAfterDropAnimation: false,
  setStatusAfterDropAnimation: (isStartAfterDropAnimation: boolean) =>
    set({ isStartAfterDropAnimation }),

  isCursorStartPositionFromOverCard: false,
  setCursorPositionFromOverCard: (isCursorStartPositionFromOverCard) =>
    set({ isCursorStartPositionFromOverCard }),

  cursorCoords: null,
  setCursorCoords: (cursorCoords) => set({ cursorCoords }),

  isInContainer: false,
  setInContainer: (isInContainer: boolean) => set({ isInContainer }),

  sharedContainerId: null,
  setSharedContainerId: (sharedContainerId) => set({ sharedContainerId }),

  isDragNodeFix: false,
  setDragNodeFix: (isDragNodeFix) => set({ isDragNodeFix }),

  isDragStart: false,
  setDragStart: (isDragStart) => set({ isDragStart }),

  dragNode: null,
  setDragNode: (dragNode) => set({ dragNode }),

  dragNodeRect: null,
  setDragNodeRect: (dragNodeRect) => set({ dragNodeRect }),

  diffDragNodeAndCursor: null,
  setDiffDragNodeAndCursor: (diffDragNodeAndCursor) =>
    set({ diffDragNodeAndCursor }),

  dragCard: null,
  setDragCard: (dragCard) => set({ dragCard }),

  overCard: null,
  setOverCard: (overCard) => set({ overCard }),

  overNode: null,
  setOverNode: (overNode) => set({ overNode }),

  overContainerNode: null,
  setOverContainerNode: (overContainerNode) => set({ overContainerNode }),

  toContainerNode: null,
  setToContainerNode: (toContainerNode) => set({ toContainerNode }),

  fromContainerNode: null,
  setFromContainerNode: (fromContainerNode) => set({ fromContainerNode }),

  dndItemsFrom: null,
  setDndItemsFrom: (dndItemsFrom) => set({ dndItemsFrom }),

  dndItemsTo: null,
  setDndItemsTo: (dndItemsTo) => set({ dndItemsTo }),
}));
