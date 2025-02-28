import clsx from 'clsx'

import s from './DndItem.module.scss'
import type {DndItemComponentType} from './DndItem.types'
import {MouseEvent, useRef} from 'react'
import {DndItemDataType, hasSharedContainer} from '../utils/utils'
import {useDndStore} from '../State'

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
    const isThisNodeCardEqualDragCard = card.order === dragCard.order

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
        if (isThisNodeCardEqualDragCard) {
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
    placeholderNode,
    setPlaceholderNode,
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
    fromContainerId,
    setFromContainerId,
    setToContainerId,
    toContainerId,
  } = useDndStore()

  const isThisNodeInSharedContainer = hasSharedContainer(
    ref.current,
    sharedContainerId,
  )

  const isThisNodeInFromContainer =
    ref.current && fromContainerNode && fromContainerNode.contains(ref.current)

  const onDrag = () => {
    setDragCard(card)
  }
  const onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (isDragStart) {
      setOverCard(card)
      setOverNode(e.currentTarget)
      setOverNodeRectOnFirstTouch(e.currentTarget.getBoundingClientRect())
      setCurrentOverNode(e.currentTarget)
    }
  }
  const onLeave = () => {
    if (isDragStart && !isInContainer) {
      setOverCard(null)
    }
  }
  // sharedContainerId

  if (
    ref.current &&
    ref.current !== dragNode &&
    overContainerNode &&
    overContainerNode.contains(ref.current) &&
    overNode
  ) {
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

  // После дропа за пределы контейнера возвращяем this ноды и ждем пока позишен станет не фиксед
  if (
    ref.current &&
    dragCard &&
    dragNodeRect &&
    isStartAfterDropAnimation &&
    isThisNodeInSharedContainer &&
    !isDragStart &&
    !isInContainer &&
    card.order > dragCard.order &&
    fromContainerNode &&
    fromContainerNode.contains(ref.current)
  ) {
    ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`
  }

  return (
    <div
      ref={ref}
      data-tvo-index={index}
      onMouseEnter={isThisNodeInSharedContainer ? onMouseEnter : () => {}}
      onMouseDown={onDrag}
      data-dnd-item='dndItem'
      className={clsx(s.dndItemWrapper, className)}
      onMouseLeave={isThisNodeInSharedContainer ? onLeave : () => {}}
    >
      <div className={s.noEvent}>{children}</div>
    </div>
  )
}

export default DndItem
