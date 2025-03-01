import clsx from 'clsx'

import s from './DndItem.module.scss'
import type {DndItemComponentType} from './DndItem.types'
import {MouseEvent, useRef} from 'react'
import {DndItemDataType, hasSharedContainer} from '../utils/utils'
import {useDndStore} from '../State'
import {DirectionType} from '../DndContainer/DndContainer.types'

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
  dndDirection,
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
      //
      else if (dndDirection === 'horizontal') {
        thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`
      } else if (dndDirection === 'vertical') {
        thisNode.style.transform = `translate( 0px, ${dragNodeRect.height}px)`
      }
    }

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

const DndItem: DndItemComponentType = props => {
  const {className = '', children, card, index} = props
  const ref = useRef<null | HTMLDivElement>(null)

  const {
    dndDirection,
    setDirection,
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
      dndDirection,
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
    if (dndDirection === 'horizontal') {
      ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`
    } else {
      ref.current.style.transform = `translate( 0px, ${dragNodeRect.height}px)`
    }
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
