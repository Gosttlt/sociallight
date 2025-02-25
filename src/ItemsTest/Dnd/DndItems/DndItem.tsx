import clsx from 'clsx'

import s from './DndItem.module.scss'
import type {DndItemComponentType} from './DndItem.types'
import {useDndStore} from '@/ItemsTest/State'
import {useRef} from 'react'
import {DndItemDataType} from '../utils'

const getStyleFromWrapper = ({
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
}) => {
  if (dragCard && isDragStart && thisNode && dragNodeRect) {
    thisNode.style.transition = `${dndDuration / 1000}s`
    // Элементы относительно перетаскиваемого
    const isThisNodeBeforeDragCard = card.order < dragCard.order
    const isThisNodeAfterDragCard = card.order > dragCard.order

    if (isInContainer) {
      if (overCard && overNodeRectOnFirstTouch) {
        // Курсор относительно элемента
        const isCursorBeforeThisNode = card.order < overCard.order
        const isCursorAfterThisNode = card.order > overCard.order
        const isCursorEqualThisNode = card.order === overCard.order

        // Елемент отнасительно курсора
        // isNextPosition

        if (isThisNodeBeforeDragCard) {
          if (isCursorBeforeThisNode) {
            thisNode.style.transform = `translate(${0}px, 0px)`
          }
          if (isCursorAfterThisNode) {
            thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`
            }
            if (!isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${0}px, 0px)`
            }
          }
        }
        if (isThisNodeAfterDragCard) {
          if (isCursorBeforeThisNode) {
            thisNode.style.transform = `translate(${0}px, 0px)`
          }
          if (isCursorAfterThisNode) {
            thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`
            }
            if (!isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${0}px, 0px)`
            }
          }
        }
      }
    }
    //
    else {
      if (isThisNodeAfterDragCard) {
        // left
        thisNode.style.transform = `translate(${0}px, 0px)`
      } else if (isThisNodeBeforeDragCard) {
        thisNode.style.transform = `translate(${0}px, 0px)`
      }
    }
  }
}

const DndItem: DndItemComponentType = props => {
  const {className = '', children, card, index} = props
  const ref = useRef<null | HTMLDivElement>(null)

  const {
    currentOverNode,
    setCurrentOverNode,
    overNodeRectOnFirstTouch,
    setOverNodeRectOnFirstTouch,
    dndDuration,
    setDndDuration,
    isStartAfterDropAnimation,
    setStatusAfterDropAnimation,
    isCursorStartPositionFromOverCard,
    setCursorPositionFromOverCard,
    cursorCoords,
    setCursorCoords,
    isInContainer,
    setInContainer,
    sharedContainerId,
    setSharedContainerId,
    isDragNodeFix,
    setDragNodeFix,
    isDragStart,
    setDragStart,
    dragNode,
    setDragNode,
    dragNodeRect,
    setDragNodeRect,
    diffDragNodeAndCursor,
    setDiffDragNodeAndCursor,
    dragCard,
    setDragCard,
    overNode,
    setOverNode,
    overCard,
    setOverCard,
    fromContainerNode,
    setFromContainerNode,
    toContainerNode,
    setToContainerNode,
    overContainerNode,
    setOverContainerNode,
    dndItemsFrom,
    setDndItemsFrom,
    dndItemsTo,
    setDndItemsTo,
  } = useDndStore()

  const onDrag = () => {
    setDragCard(card)
  }
  const onMouseOver = () => {
    if (isDragStart) {
      setOverCard(card)
    }
  }
  const onLeave = () => {
    if (isDragStart && !isInContainer) {
      setOverCard(null)
    }
  }

  if (ref.current && dragNode && ref.current !== dragNode) {
    if (overContainerNode === fromContainerNode) {
      getStyleFromWrapper({
        overNodeRectOnFirstTouch,
        card,
        isDragStart,
        isCursorStartPositionFromOverCard,
        thisNode: ref.current,
        dragCard,
        overCard,
        isInContainer,
        dragNodeRect,
        dndDuration,
      })
    }
    if (!isInContainer && isDragStart) {
      ref.current.style.transform = `translate(${0}px, 0px)`
    }
  }

  // После дропа за пределы контейнера возвращяем this ноды и ждем пока позишен станет не фиксед
  if (
    ref.current &&
    dragCard &&
    dragNodeRect &&
    isStartAfterDropAnimation &&
    !isDragStart &&
    !isInContainer &&
    card.order > dragCard.order
  ) {
    ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`
  }

  return (
    <div
      ref={ref}
      data-tvo-index={index}
      onMouseOver={onMouseOver}
      onMouseDown={onDrag}
      data-dnd-item='dndItem'
      className={clsx(s.dndItemWrapper, className)}
      onMouseLeave={onLeave}
    >
      <div className={s.noEvent}>{children}</div>
    </div>
  )
}

export default DndItem
