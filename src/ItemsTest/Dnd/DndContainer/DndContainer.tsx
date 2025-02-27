import clsx from 'clsx'

import s from './DndContainer.module.scss'
import type {
  DndContainerComponentType,
  ReturnsortCbItems,
} from './DndContainer.types'
import {
  DndItemDataType,
  getDataCurrentParent,
  getDataOtherCard,
  getDataOtherParent,
  inOneContainer,
  removeAllSelectionsFromDocument,
} from '../utils'
import {CoordsType, useDndStore} from '@/ItemsTest/State'
import {
  Children,
  cloneElement,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

// Алгаритм бага
// Выкинул
//  При смене контейнера шареда не снимается транзишн

const setAnimationDragNodeAfterDrop = ({
  currentOverNode,
  overContainerNode,
  dragCard,
  dragNode,
  dragNodeRect,
  duration,
  isCursorStartPositionFromOverCard,
  isTargetInContainer,
  overCard,
  overNodeRectOnFirstTouch,
}: {
  currentOverNode: HTMLElement | null
  overContainerNode: HTMLElement | null
  duration: number
  dragNode: HTMLElement | null
  overCard: DndItemDataType | null
  isTargetInContainer: boolean
  overNodeRectOnFirstTouch: DOMRect | null
  dragNodeRect: DOMRect | null
  dragCard: DndItemDataType | null
  isCursorStartPositionFromOverCard: boolean
}) => {
  // Куда мы кладем dragNode ?
  const isEndContainer = !overNodeRectOnFirstTouch && !currentOverNode
  const isInContainer = isTargetInContainer && overContainerNode
  const isOutsideContainer = !isTargetInContainer
  const dropOnSelf =
    isInContainer && currentOverNode && !overNodeRectOnFirstTouch
  const isAfterDragStartPos =
    dragCard &&
    overCard &&
    dragCard.order < overCard.order &&
    overNodeRectOnFirstTouch
  const isBeforeDragStartPos =
    dragCard &&
    overCard &&
    dragCard.order > overCard.order &&
    overNodeRectOnFirstTouch
  const isStartPositionOverCard = isCursorStartPositionFromOverCard
  const isEndPositionFromOverCard = !isCursorStartPositionFromOverCard
  // \Куда мы кладем dragNode

  if (dragNode && dragNodeRect) {
    dragNode.style.transition = ` ${duration / 1000}s`

    if (isOutsideContainer) {
      dragNode.style.transform = `translate(0px, ${0}px)`
      console.log('isOutsideContainer')
    }
    //
    else if (dropOnSelf) {
      dragNode.style.transform = `translate(0px, ${0}px)`
      console.log('dropOnSelf')
    }
    //
    else if (isInContainer) {
      console.log('isInContainer')
      //

      if (isEndContainer) {
        const {right} = overContainerNode.getBoundingClientRect()
        dragNode.style.transform = `translate(${
          right - dragNodeRect.x - dragNodeRect.width
        }px, ${0}px)`
        console.log('isEndContainer')
      }
      //
      //
      else if (isAfterDragStartPos && currentOverNode instanceof HTMLElement) {
        console.log('isAfterDragStartPos')

        if (isStartPositionOverCard) {
          let allLeftWidth = 0
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect()
          overContainerNode.childNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                Number(tvoIndex) < Number(tvoOverNodeIndex)
              ) {
                console.log(node.clientWidth)
                allLeftWidth += node.getBoundingClientRect().width
              }
            }
          })

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x
          dragNode.style.transform = `translate(${
            allLeftWidth - dragNodeRect.width - diffDragXAndContainerX
          }px, ${0}px)`
          console.log('isStartPositionOverCard111')
          console.log(diffDragXAndContainerX, allLeftWidth)
        }
        //
        else if (isEndPositionFromOverCard) {
          let allLeftWidth = 0
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex

          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect()

          overContainerNode.childNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                Number(tvoIndex) <= Number(tvoOverNodeIndex)
              ) {
                allLeftWidth += node.getBoundingClientRect().width
              }
            }
          })
          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x
          dragNode.style.transform = `translate(${
            allLeftWidth - dragNodeRect.width - diffDragXAndContainerX
          }px, ${0}px)`
          console.log('isEndPositionFromOverCard222')
        }
      }
      //
      else if (isBeforeDragStartPos && currentOverNode instanceof HTMLElement) {
        console.log('isBeforeDragStartPos')
        if (isStartPositionOverCard) {
          let allLeftWidth = 0
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect()
          overContainerNode.childNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                Number(tvoIndex) < Number(tvoOverNodeIndex)
              ) {
                allLeftWidth += node.getBoundingClientRect().width
              }
            }
          })

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x
          dragNode.style.transform = `translate(${
            allLeftWidth - diffDragXAndContainerX
          }px, ${0}px)`

          console.log('isStartPositionOverCard333')
        }
        //
        else if (isEndPositionFromOverCard) {
          let allLeftWidth = 0
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect()
          overContainerNode.childNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                Number(tvoIndex) <= Number(tvoOverNodeIndex)
              ) {
                allLeftWidth += node.getBoundingClientRect().width
              }
            }
          })

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x
          dragNode.style.transform = `translate(${
            allLeftWidth - diffDragXAndContainerX
          }px, ${0}px)`

          console.log('isEndPositionFromOverCard 44')
        }
      }
    }
  }
}

const setAnimationDragNodeAfterDropOnTo = ({
  currentOverNode,
  overContainerNode,
  dragNode,
  dragNodeRect,
  duration,
  isCursorStartPositionFromOverCard,
  isTargetInContainer,
}: {
  currentOverNode: HTMLElement | null
  overContainerNode: HTMLElement | null
  duration: number
  dragNode: HTMLElement | null
  isTargetInContainer: boolean

  dragNodeRect: DOMRect | null
  isCursorStartPositionFromOverCard: boolean
}) => {
  // Куда мы кладем dragNode ?
  const isInContainer = isTargetInContainer && overContainerNode
  const isStartPositionOverCard = isCursorStartPositionFromOverCard
  const isEndPositionFromOverCard = !isCursorStartPositionFromOverCard
  // \Куда мы кладем dragNode

  if (dragNode && dragNodeRect) {
    dragNode.style.transition = ` ${duration / 1000}s`

    if (isInContainer) {
      console.log('isInContainerTO')
      //

      //
      if (currentOverNode instanceof HTMLElement) {
        console.log('isBeforeDragStartPosTO')
        if (isStartPositionOverCard) {
          let allLeftWidth = 0
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect()
          overContainerNode.childNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                Number(tvoIndex) < Number(tvoOverNodeIndex)
              ) {
                allLeftWidth += node.getBoundingClientRect().width
              }
            }
          })
          const diffDragXAndContainerY =
            dragNodeRect.y - overContainerNodeRect.y

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x
          dragNode.style.transform = `translate(${
            allLeftWidth - diffDragXAndContainerX
          }px, ${-diffDragXAndContainerY}px)`

          console.log('isStartPositionOverCard333TO')
        }
        //
        else if (isEndPositionFromOverCard) {
          let allLeftWidth = 0
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect()
          overContainerNode.childNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                Number(tvoIndex) <= Number(tvoOverNodeIndex)
              ) {
                allLeftWidth += node.getBoundingClientRect().width
              }
            }
          })

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x
          const diffDragXAndContainerY =
            dragNodeRect.y - overContainerNodeRect.y

          dragNode.style.transform = `translate(${
            allLeftWidth - diffDragXAndContainerX
          }px, ${-diffDragXAndContainerY}px)`

          console.log('isEndPositionFromOverCard 44TO')
        }
      }
    }
  }
}

const setStartPositionDragNode = ({
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
  // dragNode.style.transition = '' TODO
}

const setStartPositionNodesAfterDragNode = ({
  conatinerNode,
  dragNode,
  dragNodeRect,
}: {
  conatinerNode: HTMLElement
  dragNode: HTMLElement
  dragNodeRect: DOMRect
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
        node.style.transform = `translate(${dragNodeRect.width}px, 0px)`
      }
    }
  })
}

const setPositionDragNodeWhenMoving = ({
  dragNode,
  dragNodeRect,
  diffDragNodeAndCursor,
  clientX,
  clientY,
}: {
  dragNode: HTMLElement
  dragNodeRect: DOMRect
  diffDragNodeAndCursor: CoordsType
  clientX: number
  clientY: number
}) => {
  dragNode.style.transform = `translate(${
    clientX - dragNodeRect.x - diffDragNodeAndCursor.x
  }px, ${clientY - dragNodeRect.y - diffDragNodeAndCursor.y}px)`
}

const getCursorPositionFromOverCard = ({
  overNodeRect,
  clientX,
}: {
  overNodeRect: DOMRect
  clientX: number
}) => {
  const {width, x} = overNodeRect
  const middleOverNodeCoords = width / 2 + x
  return clientX < middleOverNodeCoords
}

const DndContainer: DndContainerComponentType = props => {
  const {
    className = '',
    children,
    items,
    sharedId,
    setData,
    containerId,
  } = props
  const {
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
  const onDragStart = (e: MouseEvent<HTMLElement>) => {
    if (!isStartAfterDropAnimation) {
      const currentTarget = e.currentTarget as HTMLElement
      const target = e.target as HTMLElement

      setInContainer(true)
      removeAllSelectionsFromDocument()
      document.querySelector('body')!.style.userSelect = 'none'

      if (target.dataset.dndItem) {
        const targetRect = target.getBoundingClientRect()
        const {height, width, x, y} = targetRect
        const {clientX, clientY} = e

        const node = document.createElement('div')
        node.style.width = width + 'px'
        node.style.height = height + 'px'
        node.style.background = 'none'
        node.dataset.dndPlaceholder = 'true'
        e.currentTarget.appendChild(node)

        setPlaceholderNode(node)

        setStartPositionDragNode({
          clientX,
          clientY,
          dragNode: target,
          dragNodeX: x,
          dragNodeY: y,
        })

        setStartPositionNodesAfterDragNode({
          conatinerNode: currentTarget,
          dragNode: target,
          dragNodeRect: targetRect,
        })

        // Добавление плесхолдора

        if (placeholderNode && target) {
          currentTarget.appendChild(placeholderNode)
          placeholderNode.style.width = width + 'px'
        }
        setDragStart(true)
        setOverContainerNode(e.currentTarget)
        setCurrentOverNode(target)
        setSharedContainerId(sharedId)
        setDndItemsFrom(items)
        setFromContainerId(containerId)
        setFromContainerNode(currentTarget)
        setDiffDragNodeAndCursor({
          x: e.clientX - x,
          y: e.clientY - y,
        })
        setDragNode(target)
        setDragNodeRect(targetRect)
        setCursorCoords({x: e.clientX, y: e.clientY})
      }
    }
  }
  const onDragMove = (e: globalThis.MouseEvent) => {
    const {clientX, clientY, target} = e
    // Трансфармируем перетаскиваемый элемент по курсору
    if (dragNode && dragNodeRect && diffDragNodeAndCursor) {
      setPositionDragNodeWhenMoving({
        clientX,
        clientY,
        diffDragNodeAndCursor,
        dragNode,
        dragNodeRect,
      })
    }

    const isDndItem =
      e.target instanceof HTMLElement && e.target.dataset.dndItem
    if (isDndItem) {
      const overNodeRect = e.target.getBoundingClientRect()
      const issCursorStartPosFromOverCard = getCursorPositionFromOverCard({
        clientX,
        overNodeRect,
      })
      if (isCursorStartPositionFromOverCard !== issCursorStartPosFromOverCard) {
        setCursorPositionFromOverCard(issCursorStartPosFromOverCard)
      }
    }
    setCursorCoords({x: clientX, y: clientY})
  }
  const onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (
      isDragStart &&
      e.currentTarget.closest(
        `[data-shared-container-id='${sharedContainerId}']`,
      )
    ) {
      if (e.currentTarget !== fromContainerNode) {
        setDndItemsTo(items)
        setToContainerId(containerId)
      }
      if (placeholderNode && dragNode) {
        e.currentTarget.appendChild(placeholderNode)
        placeholderNode.style.transition = `${dndDuration / 1000}s`
        placeholderNode.style.width =
          dragNode.getBoundingClientRect().width + 'px'
      }
      if (e.currentTarget !== fromContainerNode) {
        setToContainerNode(e.currentTarget)
      }
      setInContainer(true)
      setOverContainerNode(e.currentTarget)
    }
  }

  const onMouseLeave = (e: MouseEvent<HTMLElement>) => {
    if (isDragStart && dragNode && overContainerNode) {
      overContainerNode.childNodes.forEach(node => {
        if (
          node instanceof HTMLElement &&
          node.dataset.tvoIndex &&
          dragNode !== node
        ) {
          node.style.transform = `translate(${0}px, 0px)`
          node.style.transition = `${dndDuration / 1000}s`
        }
      })
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
      if (placeholderNode) {
        placeholderNode.style.transition = `${dndDuration / 1000}s`
        if (e.currentTarget.contains(placeholderNode)) {
          placeholderNode.style.width = '0px'
        }
      }
      setOverNodeRectOnFirstTouch(null)
      setInContainer(false)
      setToContainerNode(null)
      setOverContainerNode(null)
      setCurrentOverNode(null)
    }
  }

  const onDragEnd = (e: globalThis.MouseEvent) => {
    setDragStart(false)
    setStatusAfterDropAnimation(true)
    console.log(containerId)
    console.log(fromContainerNode)
    debugger
    const isTargetContainer =
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']")

    // AfterDropAnimation
    if (
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']") === fromContainerNode
    ) {
      console.log('setAnimationDragNodeAfterDrop')
      setAnimationDragNodeAfterDrop({
        currentOverNode,
        overContainerNode,
        dragCard,
        dragNode,
        dragNodeRect,
        isCursorStartPositionFromOverCard,
        overCard,
        overNodeRectOnFirstTouch,
        duration: dndDuration,
        isTargetInContainer: !!isTargetContainer,
      })
    }

    if (
      (dragNode && !isTargetContainer) ||
      (dragNode &&
        isTargetContainer &&
        isTargetContainer instanceof HTMLElement &&
        isTargetContainer.dataset.sharedContainerId !== sharedContainerId)
    ) {
      dragNode.style.transition = ` ${dndDuration / 1000}s`
      dragNode.style.transform = `translate(0px, 0px)`
    }
    //
    else if (
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']") &&
      e.target.closest("[data-dnd-tvo='true']") === toContainerNode
    ) {
      console.log('setAnimationDragNodeAfterDropOnTo')
      setAnimationDragNodeAfterDropOnTo({
        currentOverNode,
        overContainerNode,
        dragNode,
        dragNodeRect,
        isCursorStartPositionFromOverCard,
        duration: dndDuration,
        isTargetInContainer: !!isTargetContainer,
      })
    }

    // \\AfterDropAnimation
    // debugger
    if (placeholderNode && dragNode) {
      placeholderNode.style.width =
        dragNode.getBoundingClientRect().width + 'px'
    }
    console.log(containerId, 'containerId')
    if (dragNode) {
      dragNode.addEventListener('transitionend', function transitionEnd() {
        console.log(containerId, 'containerId')
        document.querySelector('body')!.style.userSelect = ''
        if (placeholderNode) {
          placeholderNode.remove()
        }
        let newItems: Omit<ReturnsortCbItems, 'fromId'> | null = null
        if (dragCard && dndItemsFrom) {
          if (
            overCard &&
            isTargetContainer &&
            overContainerNode === fromContainerNode
          ) {
            console.log('inOneContainer')
            newItems = inOneContainer({
              cards: dndItemsFrom,
              dragCard: dragCard,
              isNextPosition: !isCursorStartPositionFromOverCard,
              lastOverCard: overCard,
            })
          }
          //
          // else if (
          //   !currentOverNode &&
          //   overContainerNode === fromContainerNode
          // ) {
          //   console.log('getDataCurrentParentEnd')
          //   newItems = getDataCurrentParent({
          //     cards: dndItemsFrom,
          //     dragCard: dragCard,
          //   })
          // }
          //
          // else if (
          //   dndItemsFrom &&
          //   dndItemsTo &&
          //   overContainerNode &&
          //   toContainerNode &&
          //   overContainerNode === toContainerNode
          // ) {
          //   newItems = getDataOtherParent({
          //     dragCard,
          //     fromCards: dndItemsFrom,
          //     toCards: dndItemsTo,
          //   })
          // }
          //
          else if (
            dndItemsFrom &&
            dndItemsTo &&
            overContainerNode &&
            toContainerNode &&
            overCard &&
            overContainerNode === toContainerNode
          ) {
            newItems = getDataOtherCard({
              isNextPosition: !isCursorStartPositionFromOverCard,
              lastOverCard: overCard,
              dragCard,
              fromCards: dndItemsFrom,
              toCards: dndItemsTo,
            })
          }
          if (newItems && fromContainerId) {
            setData({...newItems, fromId: fromContainerId, toID: toContainerId})
          }
          dragNode.style.transform = ''
          dragNode.style.transition = ''
          dragNode.style.position = ''
          dragNode.style.pointerEvents = ''
          dragNode.style.top = ''
          dragNode.style.left = ''
          dragNode.style.zIndex = ''
          if (fromContainerNode) {
            fromContainerNode.style.width = ''
            fromContainerNode.childNodes.forEach(node => {
              if (node instanceof HTMLElement) {
                node.style.transform = ``
                node.style.transition = ''
              }
            })
          }
          if (toContainerNode) {
            toContainerNode.style.width = ''
            toContainerNode.childNodes.forEach(node => {
              if (node instanceof HTMLElement) {
                node.style.transform = ``
                node.style.transition = ''
              }
            })
          }
        }
        //

        setCurrentOverNode(null)
        setCursorCoords(null)
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
    if (isDragStart && dragNode && sharedContainerId === sharedId) {
      window.addEventListener('mousemove', onDragMove)
      window.addEventListener('mouseup', onDragEnd)
    }

    return () => {
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('mousemove', onDragMove)
    }
  }, [
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

  useEffect(() => {
    const body = document.querySelector('body')
    if (isDragStart && body) {
      body.style.cursor = 'grabbing'
    } else if (!isDragStart && body) {
      body.style.cursor = ''
    }
  }, [isDragStart])

  const containerRef = useRef<null | HTMLDivElement>(null)

  const isThisSharedContainer =
    containerRef.current &&
    containerRef.current.closest(
      `[data-shared-container-id='${sharedContainerId}']`,
    )
  return (
    <div
      ref={containerRef}
      onMouseDown={onDragStart}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      data-dnd-tvo={true}
      data-shared-container-id={sharedId}
      className={clsx(s.dndContainerWrapper, className, {
        [s.cell]: isDragStart && isThisSharedContainer,
        [s.noDrop]: isDragStart && !isThisSharedContainer,
      })}
    >
      {children}
    </div>
  )
}

export default DndContainer
