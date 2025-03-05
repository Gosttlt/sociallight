import {create} from 'zustand'
import {DndItemDataType} from '../utils/utils'
import {DirectionType} from '../DndContainer/DndContainer.types'

export type CoordsType = {x: number; y: number}

interface DndState {
  isDragReady: boolean
  setDragReady: (isDragReady: boolean) => void

  dndDirection: DirectionType
  setDirection: (dndDirection: DirectionType) => void

  fromContainerId: string | null
  setFromContainerId: (fromContainerId: string | null) => void

  toContainerId: string | null
  setToContainerId: (fromContainerId: string | null) => void

  placeholderNode: HTMLElement | null
  setPlaceholderNode: (placeholderNode: HTMLElement | null) => void

  currentOverNode: HTMLElement | null
  setCurrentOverNode: (currentOverNode: HTMLElement | null) => void

  overNodeRectOnFirstTouch: DOMRect | null
  setOverNodeRectOnFirstTouch: (
    overNodeRectOnFirstTouch: DOMRect | null,
  ) => void

  dndDuration: number
  setDndDuration: (dndDuration: number) => void

  isStartAfterDropAnimation: boolean
  setStatusAfterDropAnimation: (coords: boolean) => void

  isCursorStartPositionFromOverCard: boolean
  setCursorPositionFromOverCard: (
    isCursorStartPositionFromOverCard: boolean,
  ) => void

  cursorCoords: CoordsType | null
  setCursorCoords: (coords: CoordsType | null) => void

  isInContainer: boolean
  setInContainer: (isInContainer: boolean) => void

  sharedContainerId: string | null
  setSharedContainerId: (id: string | null) => void

  isDragNodeFix: boolean
  setDragNodeFix: (state: boolean) => void

  isDragStart: boolean
  setDragStart: (state: boolean) => void

  dragNode: HTMLElement | null
  setDragNode: (node: HTMLElement | null) => void

  dragNodeRect: DOMRect | null
  setDragNodeRect: (nodeRect: DOMRect | null) => void

  diffDragNodeAndCursor: CoordsType | null
  setDiffDragNodeAndCursor: (coords: CoordsType | null) => void

  dragCard: DndItemDataType | null
  setDragCard: (dragCard: DndItemDataType | null) => void

  overNode: HTMLElement | null
  setOverNode: (node: HTMLElement | null) => void

  overCard: DndItemDataType | null
  setOverCard: (overCard: DndItemDataType | null) => void

  fromContainerNode: HTMLElement | null
  setFromContainerNode: (node: HTMLElement | null) => void

  toContainerNode: HTMLElement | null
  setToContainerNode: (node: HTMLElement | null) => void

  overContainerNode: HTMLElement | null
  setOverContainerNode: (node: HTMLElement | null) => void

  dndItemsFrom: DndItemDataType[] | null
  setDndItemsFrom: (items: DndItemDataType[] | null) => void

  dndItemsTo: DndItemDataType[] | null
  setDndItemsTo: (items: DndItemDataType[] | null) => void
}

// Как определить конечную точку драг ноды когда драговер в движении

export const useDndStore = create<DndState>(set => ({
  isDragReady: false,
  setDragReady: (isDragReady: boolean) => set({isDragReady}),

  dndDirection: 'horizontal',
  setDirection: (dndDirection: DirectionType) => set({dndDirection}),

  fromContainerId: null,
  setFromContainerId: (fromContainerId: string | null) =>
    set({fromContainerId}),

  toContainerId: null,
  setToContainerId: (toContainerId: string | null) => set({toContainerId}),

  placeholderNode: null,
  setPlaceholderNode: placeholderNode => set({placeholderNode}),

  currentOverNode: null,
  setCurrentOverNode: currentOverNode => set({currentOverNode}),

  overNodeRectOnFirstTouch: null,
  setOverNodeRectOnFirstTouch: overNodeRectOnFirstTouch =>
    set({overNodeRectOnFirstTouch}),

  dndDuration: 300,
  setDndDuration: dndDuration => set({dndDuration}),

  isStartAfterDropAnimation: false,
  setStatusAfterDropAnimation: (isStartAfterDropAnimation: boolean) =>
    set({isStartAfterDropAnimation}),

  isCursorStartPositionFromOverCard: false,
  setCursorPositionFromOverCard: isCursorStartPositionFromOverCard =>
    set({isCursorStartPositionFromOverCard}),

  cursorCoords: null,
  setCursorCoords: cursorCoords => set({cursorCoords}),

  isInContainer: false,
  setInContainer: (isInContainer: boolean) => set({isInContainer}),

  sharedContainerId: null,
  setSharedContainerId: sharedContainerId => set({sharedContainerId}),

  isDragNodeFix: false,
  setDragNodeFix: isDragNodeFix => set({isDragNodeFix}),

  isDragStart: false,
  setDragStart: isDragStart => set({isDragStart}),

  dragNode: null,
  setDragNode: dragNode => set({dragNode}),

  dragNodeRect: null,
  setDragNodeRect: dragNodeRect => set({dragNodeRect}),

  diffDragNodeAndCursor: null,
  setDiffDragNodeAndCursor: diffDragNodeAndCursor =>
    set({diffDragNodeAndCursor}),

  dragCard: null,
  setDragCard: dragCard => set({dragCard}),

  overCard: null,
  setOverCard: overCard => set({overCard}),

  overNode: null,
  setOverNode: overNode => set({overNode}),

  overContainerNode: null,
  setOverContainerNode: overContainerNode => set({overContainerNode}),

  toContainerNode: null,
  setToContainerNode: toContainerNode => set({toContainerNode}),

  fromContainerNode: null,
  setFromContainerNode: fromContainerNode => set({fromContainerNode}),

  dndItemsFrom: null,
  setDndItemsFrom: dndItemsFrom => set({dndItemsFrom}),

  dndItemsTo: null,
  setDndItemsTo: dndItemsTo => set({dndItemsTo}),
}))
