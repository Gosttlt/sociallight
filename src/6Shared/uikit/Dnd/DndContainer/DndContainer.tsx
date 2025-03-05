import clsx from 'clsx'

import s from './DndContainer.module.scss'
import type {
  DirectionType,
  DndContainerComponentType,
  ReturnsortCbItems,
} from './DndContainer.types'
import {
  getDataOtherCard,
  hasSharedContainer,
  inOneContainer,
  removeAllSelectionsFromDocument,
} from '../utils/utils'
import {MouseEvent, useEffect, useRef} from 'react'
import {useDndStore} from '../State'
import useDebaunce from '@/6Shared/hooks/uiHooks/useDebaunce'
import {
  clearContainerStyles,
  clearDraggedNodeStyles,
  getCursorPositionFromOverCard,
  setAnimationDragNodeAfterDrop,
  setPlaceholderStyleWhenEnter,
  setPositionDragNodeWhenMoving,
  setStartPositionDragNode,
  setStartPositionNodesAfterDragNode,
  setStartStylePlaceholderNode,
} from '../utils/styleUtils'

const DndContainer: DndContainerComponentType = props => {
  const {
    className = '',
    children,
    items,
    sharedId,
    setData,
    containerId,
    direction = 'horizontal',
    reverse,
  } = props
  const {
    isDragReady,
    dndDirection,
    setDirection,
    fromContainerId,
    setFromContainerId,
    setToContainerId,
    toContainerId,
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
  } = useDndStore()

  const placeholderNodeRef = useRef<HTMLDivElement | null>(null)

  // очистка элементов посещенного контейнера
  const isAbortClaerCb = useRef<boolean>(false)

  const transitionEndCb = (overContainerNode: HTMLElement) => {
    if (!isAbortClaerCb.current) {
      overContainerNode.childNodes.forEach(node => {
        if (
          node instanceof HTMLElement &&
          node.dataset.tvoIndex &&
          dragNode !== node
        ) {
          node.style.transform = ``
          node.style.transition = ``
        }
      })
    }
  }
  const transitionEndCbDeb = useDebaunce(transitionEndCb, dndDuration / 1000)
  //\ очистка элементов посещенного контейнера

  const onDragStart = (e: MouseEvent<HTMLElement>) => {
    console.log(isStartAfterDropAnimation)
    if (!isStartAfterDropAnimation && isDragReady) {
      const currentTarget = e.currentTarget as HTMLElement
      const target = e.target as HTMLElement

      setInContainer(true)
      removeAllSelectionsFromDocument()

      const dndItem = target.closest(`[data-dnd-item="dndItem"]`)

      if (dndItem && dndItem instanceof HTMLElement) {
        e.stopPropagation()
        setDirection(direction)
        document.querySelector('body')!.style.userSelect = 'none'
        document.querySelector('body')!.style.cursor = 'grabbing'
        const targetRect = dndItem.getBoundingClientRect()
        const {x, y} = targetRect
        const {clientX, clientY} = e

        setStartStylePlaceholderNode({
          direction,
          node: placeholderNodeRef.current,
          targetRect,
        })

        setStartPositionDragNode({
          clientX,
          clientY,
          dragNode: dndItem,
          dragNodeX: x,
          dragNodeY: y,
        })

        setStartPositionNodesAfterDragNode({
          conatinerNode: currentTarget,
          dragNode: dndItem,
          dragNodeRect: targetRect,
          direction,
        })

        // Добавление плесхолдора
        if (items) {
          setDndItemsFrom(items)
        }
        setDragStart(true)
        setOverContainerNode(e.currentTarget)
        setCurrentOverNode(dndItem)
        setSharedContainerId(sharedId)
        setFromContainerId(containerId)
        setFromContainerNode(currentTarget)
        setDiffDragNodeAndCursor({
          x: e.clientX - x,
          y: e.clientY - y,
        })
        setDragNode(dndItem)
        setDragNodeRect(targetRect)
      }
    }
  }

  const onDragMove = (e: globalThis.MouseEvent) => {
    const {clientX, clientY, target} = e

    // Трансфармируем перетаскиваемый элемент по курсору
    setPositionDragNodeWhenMoving({
      clientX,
      clientY,
      diffDragNodeAndCursor,
      dragNode,
      dragNodeRect,
    })

    const isDndItem = target instanceof HTMLElement && target.dataset.dndItem

    if (isDndItem && overContainerNode && overContainerNode.contains(target)) {
      const overNodeRect = target.getBoundingClientRect()

      const isCursorStartPosFromOverCard = getCursorPositionFromOverCard({
        clientX,
        clientY,
        overNodeRect,
        direction,
      })
      if (isCursorStartPositionFromOverCard !== isCursorStartPosFromOverCard) {
        setCursorPositionFromOverCard(isCursorStartPosFromOverCard)
      }
    }
  }

  const onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (
      isDragStart &&
      e.currentTarget.closest(
        `[data-shared-container-id='${sharedContainerId}']`,
      )
    ) {
      isAbortClaerCb.current = true

      setPlaceholderStyleWhenEnter({
        dndDuration,
        dragNodeRect,
        node: placeholderNodeRef.current,
        direction,
      })

      if (e.currentTarget !== fromContainerNode) {
        if (items) {
          setDndItemsTo(items)
        }
        setToContainerId(containerId)
        setToContainerNode(e.currentTarget)
      }
      setInContainer(true)
      setOverContainerNode(e.currentTarget)
    }
  }

  const onMouseLeave = (e: MouseEvent<HTMLElement>) => {
    if (isDragStart && dragNode && overContainerNode) {
      isAbortClaerCb.current = false

      let lastId: null | HTMLElement = null

      overContainerNode.childNodes.forEach(node => {
        if (
          node instanceof HTMLElement &&
          node.dataset.tvoIndex &&
          dragNode !== node
        ) {
          lastId = node
          node.style.transform = `translate(0px, 0px)`
          node.style.transition = `${dndDuration / 1000}s`
        }
      })
      // очистка элементов посещенного контейнера
      if (lastId !== null && e.currentTarget === toContainerNode) {
        let lastIdCur = lastId as HTMLElement
        lastIdCur.addEventListener('transitionend', function transitionEnd() {
          transitionEndCbDeb(overContainerNode)
          lastIdCur.removeEventListener('transitionend', transitionEnd)
        })
      }
      //\ очистка элементов посещенного контейнера
    }
    if (
      isDragStart &&
      e.currentTarget.closest(
        `[data-shared-container-id='${sharedContainerId}']`,
      )
    ) {
      if (e.currentTarget !== fromContainerNode) {
        setDndItemsTo(null)
        setToContainerId(null)
      }
      if (placeholderNodeRef.current) {
        placeholderNodeRef.current.style.transition = `${dndDuration / 1000}s`
        placeholderNodeRef.current.style.width = '0px'
        placeholderNodeRef.current.style.height = '0px'
      }
      setOverNodeRectOnFirstTouch(null)
      setInContainer(false)
      setToContainerNode(null)
      setOverContainerNode(null)
      setCurrentOverNode(null)
    }
  }

  const onMouseUp = (e: MouseEvent<HTMLElement>) => {
    if (
      isDragStart &&
      hasSharedContainer(containerRef.current, sharedContainerId)
    ) {
      setDragStart(false)
      setStatusAfterDropAnimation(true)
      setAnimationDragNodeAfterDrop({
        currentOverNode,
        thisNode: e.currentTarget,
        dragNode,
        dragNodeRect,
        isCursorStartPositionFromOverCard,
        duration: dndDuration,
        dndDirection,
      })

      if (dragNode) {
        dragNode.addEventListener('transitionend', function transitionEnd() {
          if (placeholderNodeRef.current) {
            placeholderNodeRef.current.style.width = '0px'
            placeholderNodeRef.current.style.height = '0px'
          }
          document.querySelector('body')!.style.userSelect = ''
          document.querySelector('body')!.style.cursor = ''

          let newItems: Omit<ReturnsortCbItems, 'fromId'> | null = null
          if (dragCard && dndItemsFrom) {
            if (overCard && overContainerNode === fromContainerNode) {
              newItems = inOneContainer({
                reverse,
                cards: dndItemsFrom,
                dragCard: dragCard,
                isNextPosition: !isCursorStartPositionFromOverCard,
                lastOverCard: overCard,
              })
            }
            //
            else if (
              dndItemsFrom &&
              dndItemsTo &&
              overContainerNode &&
              toContainerNode &&
              overCard &&
              overContainerNode === toContainerNode
            ) {
              console.log('dasdad', dndItemsFrom)
              console.log('dasdad', dndItemsTo)
              newItems = getDataOtherCard({
                reverse,
                isNextPosition: !isCursorStartPositionFromOverCard,
                lastOverCard: overCard,
                dragCard,
                fromCards: dndItemsFrom,
                toCards: dndItemsTo,
              })
            }
            if (newItems && fromContainerId) {
              setData({
                ...newItems,
                fromId: fromContainerId,
                toID: toContainerId,
              })
            }

            clearDraggedNodeStyles(dragNode)
            clearContainerStyles(overContainerNode)
            clearContainerStyles(fromContainerNode)
          }

          setCurrentOverNode(null)
          setDiffDragNodeAndCursor(null)
          setDragCard(null)
          setDragNode(null)
          setDragNodeRect(null)
          setFromContainerNode(null)
          setStatusAfterDropAnimation(false)
          setOverCard(null)
          setOverContainerNode(null)
          setOverNode(null)
          setOverNodeRectOnFirstTouch(null)
          setToContainerNode(null)
          setFromContainerId(null)
          setToContainerId(null)
          setPlaceholderNode(null)
          setDndItemsFrom(null)
          dragNode.removeEventListener('transitionend', transitionEnd)
        })
      }
    }
  }

  const onDragEnd = (e: globalThis.MouseEvent) => {
    const isTargetContainer =
      e.target instanceof HTMLElement &&
      !hasSharedContainer(e.target, sharedContainerId)

    if (placeholderNodeRef.current && dragNodeRect) {
      if (direction === 'horizontal') {
        placeholderNodeRef.current.style.width = dragNodeRect.width + 'px'
      } else {
        placeholderNodeRef.current.style.height = dragNodeRect.height + 'px'
      }
    }

    document.querySelector('body')!.style.userSelect = ''
    document.querySelector('body')!.style.cursor = ''

    // AfterDropAnimation

    if (dragNode && isTargetContainer) {
      setDragStart(false)
      setStatusAfterDropAnimation(true)
      dragNode.style.transition = ` ${dndDuration / 1000}s`
      dragNode.style.transform = `translate(0px, 0px)`
    }
    //

    // \\AfterDropAnimation

    if (dragNode) {
      dragNode.addEventListener('transitionend', function transitionEnd() {
        if (placeholderNodeRef.current) {
          placeholderNodeRef.current.style.width = '0px'
          placeholderNodeRef.current.style.height = '0px'
        }

        if (dragCard && dndItemsFrom) {
          clearDraggedNodeStyles(dragNode)
          clearContainerStyles(fromContainerNode)
        }
        //

        setCurrentOverNode(null)
        setDiffDragNodeAndCursor(null)
        setDragCard(null)
        setDragNode(null)
        setDragNodeRect(null)
        setFromContainerNode(null)
        setStatusAfterDropAnimation(false)
        setOverCard(null)
        setOverContainerNode(null)
        setOverNode(null)
        setOverNodeRectOnFirstTouch(null)
        setToContainerNode(null)
        setFromContainerId(null)
        setToContainerId(null)
        setPlaceholderNode(null)
        setDndItemsFrom(null)
        dragNode.removeEventListener('transitionend', transitionEnd)
      })
    }
  }

  useEffect(() => {
    if (
      containerRef.current &&
      isDragStart &&
      dragNode &&
      sharedContainerId === sharedId
    ) {
      if (fromContainerNode === containerRef.current) {
        window.addEventListener('mousemove', onDragMove)
        window.addEventListener('mouseup', onDragEnd)
      }
    }

    return () => {
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('mousemove', onDragMove)
    }
  }, [
    dndDirection,
    setDirection,
    placeholderNodeRef.current,
    containerId,
    fromContainerId,
    setFromContainerId,
    setToContainerId,
    toContainerId,
    placeholderNode,
    setPlaceholderNode,
    setData,
    items,
    dndItemsFrom,
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
  ])

  const containerRef = useRef<null | HTMLDivElement>(null)

  const isThisSharedContainer = hasSharedContainer(
    containerRef.current,
    sharedContainerId,
  )
  return (
    <div
      ref={containerRef}
      onMouseDown={onDragStart}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      data-dnd-tvo={true}
      data-shared-container-id={sharedId}
      className={clsx(s.dndContainerWrapper, className, {
        [s.activeDragContainer]: isDragStart && isThisSharedContainer,
        [s.vertiacalDirection]: direction === 'vertical',
        [s.cell]: isDragStart && isThisSharedContainer,
        [s.noDrop]: isDragStart && !isThisSharedContainer,
        [s.grab]: isDragReady,
      })}
    >
      {children}
      <div
        ref={placeholderNodeRef}
        data-dnd-placeholder='true'
        className={s.placeholder}
      ></div>
    </div>
  )
}

export default DndContainer
