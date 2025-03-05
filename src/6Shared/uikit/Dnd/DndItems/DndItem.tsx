import clsx from 'clsx'

import s from './DndItem.module.scss'
import type {DndItemComponentType} from './DndItem.types'
import {MouseEvent, useRef} from 'react'
import {DndItemDataType, hasSharedContainer} from '../utils/utils'
import {useDndStore} from '../State'
import {DirectionType} from '../DndContainer/DndContainer.types'
import {getStyleFromWrapper} from '../utils/styleUtils'

const DndItem: DndItemComponentType = props => {
  const {className = '', children, card, index, reverse} = props
  const ref = useRef<null | HTMLDivElement>(null)

  const {
    isDragReady,
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

  const isThisNodeFromSharedContainer =
    ref.current &&
    (ref.current.closest(`[ data-dnd-tvo="true"]`) as HTMLElement).dataset
      .sharedContainerId === sharedContainerId

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
    isThisNodeFromSharedContainer &&
    overContainerNode &&
    overContainerNode.contains(ref.current) &&
    overNode
  ) {
    getStyleFromWrapper({
      reverse,
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
    isThisNodeFromSharedContainer &&
    !isInContainer &&
    fromContainerNode &&
    fromContainerNode.contains(ref.current)
  ) {
    if (reverse && card.order < dragCard.order) {
      if (dndDirection === 'horizontal') {
        ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`
      } else {
        ref.current.style.transform = `translate( 0px, ${dragNodeRect.height}px)`
      }
    } else if (!reverse && card.order > dragCard.order) {
      if (dndDirection === 'horizontal') {
        ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`
      } else {
        ref.current.style.transform = `translate( 0px, ${dragNodeRect.height}px)`
      }
    }
  }
  const isNoEventItem =
    isDragStart && hasSharedContainer(ref.current, sharedContainerId)

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
      <div className={clsx({[s.noEvent]: isNoEventItem})}>{children}</div>
    </div>
  )
}

export default DndItem
