import {DirectionType} from '../DndContainer/DndContainer.types'
import {CoordsType} from '../State'
import {DndItemDataType} from './utils'

// dragStart

export const setStartStylePlaceholderNode = ({
  direction,
  node,
  targetRect,
}: {
  direction: DirectionType
  node: HTMLDivElement | null
  targetRect: DOMRect
}) => {
  if (node) {
    node.style.background = 'none'
    node.style.transition = ''
    if (direction === 'horizontal') {
      node.style.width = targetRect.width + 'px'
      node.style.height = 0 + 'px'
    } else {
      node.style.width = 0 + 'px'
      node.style.height = targetRect.height + 'px'
    }
  }
}
export const setStartPositionDragNode = ({
  dragNode,
  clientX,
  clientY,
  dragNodeX,
  dragNodeY,
}: {
  dragNode: HTMLElement
  dragNodeX: number
  dragNodeY: number
  clientX: number
  clientY: number
}) => {
  const diffDragNodeAndCursorX = clientX - dragNodeX
  const diffDragNodeAndCursorY = clientY - dragNodeY
  dragNode.style.position = 'fixed'
  dragNode.style.zIndex = '1000'
  dragNode.style.left = clientX - diffDragNodeAndCursorX + 'px'
  dragNode.style.top = clientY - diffDragNodeAndCursorY + 'px'
  dragNode.style.pointerEvents = 'none'
}

export const setStartPositionNodesAfterDragNode = ({
  conatinerNode,
  dragNode,
  dragNodeRect,
  direction,
}: {
  conatinerNode: HTMLElement
  dragNode: HTMLElement
  dragNodeRect: DOMRect
  direction: DirectionType
}) => {
  const dragNodeIndex = dragNode.dataset.tvoIndex
  conatinerNode.childNodes.forEach(node => {
    if (node instanceof HTMLElement) {
      const tvoIndex = node.dataset.tvoIndex
      if (
        tvoIndex &&
        dragNodeIndex &&
        Number(tvoIndex) > Number(dragNodeIndex)
      ) {
        if (direction === 'horizontal') {
          node.style.transform = `translate(${dragNodeRect.width}px, 0px)`
        } else {
          node.style.transform = `translate( 0px, ${dragNodeRect.height}px)`
        }
      }
    }
  })
}

//\ dragStart

// dragMove

export const setPositionDragNodeWhenMoving = ({
  dragNode,
  dragNodeRect,
  diffDragNodeAndCursor,
  clientX,
  clientY,
}: {
  dragNode: HTMLElement | null
  dragNodeRect: DOMRect | null
  diffDragNodeAndCursor: CoordsType | null
  clientX: number
  clientY: number
}) => {
  if (dragNode && dragNodeRect && diffDragNodeAndCursor) {
    dragNode.style.transform = `translate(${
      clientX - dragNodeRect.x - diffDragNodeAndCursor.x
    }px, ${clientY - dragNodeRect.y - diffDragNodeAndCursor.y}px)`
  }
}

export const getCursorPositionFromOverCard = ({
  overNodeRect,
  clientX,
  clientY,
  direction,
}: {
  overNodeRect: DOMRect
  clientX: number
  clientY: number
  direction: DirectionType
}) => {
  const {width, x, height, y} = overNodeRect

  if (direction === 'horizontal') {
    const middleOverNodeCoords = width / 2 + x
    return clientX < middleOverNodeCoords
  } else {
    const middleOverNodeCoords = height / 2 + y
    return clientY < middleOverNodeCoords
  }
}

// \dragMove

//  dragEnter
export const setPlaceholderStyleWhenEnter = ({
  dndDuration,
  dragNodeRect,
  node,
  direction,
}: {
  node: HTMLDivElement | null
  dragNodeRect: DOMRect | null
  dndDuration: number
  direction: DirectionType
}) => {
  if (node && dragNodeRect) {
    node.style.transition = `${dndDuration / 1000}s`
    if (direction === 'horizontal') {
      node.style.width = dragNodeRect.width + 'px'
    } else {
      node.style.height = dragNodeRect.height + 'px'
    }
  }
}
// \dragEnter

export const clearDraggedNodeStyles = (dragNode: HTMLElement | null) => {
  if (dragNode) {
    dragNode.style.transform = ''
    dragNode.style.transition = ''
    dragNode.style.position = ''
    dragNode.style.pointerEvents = ''
    dragNode.style.top = ''
    dragNode.style.left = ''
    dragNode.style.zIndex = ''
  }
}

export const clearContainerStyles = (containerNode: HTMLElement | null) => {
  if (containerNode) {
    containerNode.childNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        node.style.transform = ``
        node.style.transition = ''
      }
    })
  }
}

// onMouseUp

export const setAnimationDragNodeAfterDrop = ({
  currentOverNode,
  thisNode,
  dragNode,
  dragNodeRect,
  duration,
  isCursorStartPositionFromOverCard,
  dndDirection,
}: {
  currentOverNode: HTMLElement | null
  thisNode: HTMLElement
  duration: number
  dragNode: HTMLElement | null
  dragNodeRect: DOMRect | null
  isCursorStartPositionFromOverCard: boolean
  dndDirection: DirectionType
}) => {
  // Куда мы кладем dragNode ?

  if (dragNode && dragNodeRect && currentOverNode) {
    dragNode.style.transition = ` ${duration / 1000}s`
    const {x, y} = thisNode.getBoundingClientRect()
    //

    const setTransform = (isStartPosition: boolean) => {
      let distanceFromStartContainerToDragNode = 0
      const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex

      thisNode.childNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          const tvoIndex = node.dataset.tvoIndex
          const isPrevDragNode = isStartPosition
            ? Number(tvoIndex) < Number(tvoOverNodeIndex)
            : Number(tvoIndex) <= Number(tvoOverNodeIndex)
          if (
            tvoIndex &&
            node !== dragNode &&
            tvoOverNodeIndex &&
            isPrevDragNode
          ) {
            if (dndDirection === 'horizontal') {
              distanceFromStartContainerToDragNode +=
                node.getBoundingClientRect().width
            } else {
              distanceFromStartContainerToDragNode +=
                node.getBoundingClientRect().height
            }
          }
        }
      })

      let diffDragXAndContainerX = 0
      let diffDragXAndContainerY = 0

      if (dndDirection === 'horizontal') {
        diffDragXAndContainerX =
          distanceFromStartContainerToDragNode - (dragNodeRect.x - x)
        diffDragXAndContainerY = y - dragNodeRect.y
      } else {
        diffDragXAndContainerX = x - dragNodeRect.x
        diffDragXAndContainerY =
          distanceFromStartContainerToDragNode - (dragNodeRect.y - y)
      }
      dragNode.style.transform = `translate(${diffDragXAndContainerX}px, ${diffDragXAndContainerY}px)`
    }
    setTransform(isCursorStartPositionFromOverCard)
  }
}
// \ onMouseUp

// DndItems
export const getStyleFromWrapper = ({
  card,
  dragCard,
  isCursorStartPositionFromOverCard,
  overCard,
  isInContainer,
  isDragStart,
  thisNode,
  dragNodeRect,
  dndDuration,
  overNodeRectOnFirstTouch,
  dndDirection,
  reverse,
}: {
  thisNode: HTMLElement | null
  overCard?: DndItemDataType | null
  card: DndItemDataType
  dragCard?: DndItemDataType | null
  isCursorStartPositionFromOverCard: boolean | null
  isInContainer?: boolean | null
  isDragStart: boolean
  dragNodeRect: DOMRect | null
  overNodeRectOnFirstTouch: DOMRect | null
  dndDuration: number
  dndDirection: DirectionType
  reverse?: boolean
}) => {
  if (dragCard && isDragStart && thisNode && dragNodeRect) {
    thisNode.style.transition = `${dndDuration / 1000}s`
    // Элементы относительно перетаскиваемого
    const isThisNodeBeforeDragCard = card.order < dragCard.order
    const isThisNodeAfterDragCard = card.order > dragCard.order
    const isThisNodeCardEqualDragCard = card.order === dragCard.order

    const setTransform = (dndDirection: DirectionType | 'clear') => {
      if (dndDirection === 'clear') {
        thisNode.style.transform = `translate(0px, 0px)`
      }

      if (dndDirection === 'horizontal') {
        thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`
      }
      //
      else if (dndDirection === 'vertical') {
        thisNode.style.transform = `translate( 0px, ${dragNodeRect.height}px)`
      }
    }

    if (isInContainer) {
      if (overCard && overNodeRectOnFirstTouch) {
        // Курсор относительно элемента
        let isCursorBeforeThisNode = card.order < overCard.order
        let isCursorAfterThisNode = card.order > overCard.order
        const isCursorEqualThisNode = card.order === overCard.order
        if (reverse) {
          isCursorBeforeThisNode = card.order > overCard.order
          isCursorAfterThisNode = card.order < overCard.order
        }

        // Елемент отнасительно курсора
        // isNextPosition

        if (isThisNodeBeforeDragCard) {
          if (isCursorBeforeThisNode) {
            setTransform('clear')
          }
          if (isCursorAfterThisNode) {
            setTransform(dndDirection)
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              setTransform(dndDirection)
            }
            if (!isCursorStartPositionFromOverCard) {
              setTransform('clear')
            }
          }
        }
        if (isThisNodeAfterDragCard) {
          if (isCursorBeforeThisNode) {
            setTransform('clear')
          }
          if (isCursorAfterThisNode) {
            setTransform(dndDirection)
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              setTransform(dndDirection)
            }
            if (!isCursorStartPositionFromOverCard) {
              setTransform('clear')
            }
          }
        }
        if (isThisNodeCardEqualDragCard) {
          if (isCursorBeforeThisNode) {
            setTransform('clear')
          }
          if (isCursorAfterThisNode) {
            setTransform(dndDirection)
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              setTransform(dndDirection)
            }
            if (!isCursorStartPositionFromOverCard) {
              setTransform('clear')
            }
          }
        }
      }
    }
    //
    else {
      if (isThisNodeAfterDragCard) {
        // left
        setTransform('clear')
      } else if (isThisNodeBeforeDragCard) {
        setTransform('clear')
      }
    }
  }
}

// \
