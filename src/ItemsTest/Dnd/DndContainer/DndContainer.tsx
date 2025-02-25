import clsx from 'clsx'

import s from './DndContainer.module.scss'
import type {DndContainerComponentType} from './DndContainer.types'
import {
  DndItemDataType,
  getDataCurrentParent,
  inOneContainer,
  removeAllSelectionsFromDocument,
} from '../utils'
import {CoordsType, useDndStore} from '@/ItemsTest/State'
import {Children, cloneElement, MouseEvent, useEffect} from 'react'
import DndItem from '../DndItems/DndItem'

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
              if (tvoIndex && tvoOverNodeIndex && tvoIndex < tvoOverNodeIndex) {
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
                tvoIndex <= tvoOverNodeIndex
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
              if (tvoIndex && tvoOverNodeIndex && tvoIndex < tvoOverNodeIndex) {
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
                tvoIndex <= tvoOverNodeIndex
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

const setStartPositionDragCard = ({
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

const setStartPositionAfterDragNodes = ({
  conatinerNode,
  dragNode,
  dragNodeRect,
}: {
  conatinerNode: HTMLElement
  dragNode: HTMLElement
  dragNodeRect: DOMRect
}) => {
  conatinerNode.childNodes.forEach(node => {
    if (node instanceof HTMLElement) {
      const tvoIndex = node.dataset.tvoIndex
      const dragNodeIndex = dragNode.dataset.tvoIndex
      if (tvoIndex && dragNodeIndex && tvoIndex > dragNodeIndex) {
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
  const {className = '', children, items, sharedId, setData} = props
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
        setStartPositionDragCard({
          clientX,
          clientY,
          dragNode: target,
          dragNodeX: x,
          dragNodeY: y,
        })

        setStartPositionAfterDragNodes({
          conatinerNode: currentTarget,
          dragNode: target,
          dragNodeRect: targetRect,
        })

        currentTarget.style.width = currentTarget.offsetWidth + width + 'px'

        setDragStart(true)
        setCurrentOverNode(target)
        setSharedContainerId(sharedId)
        setDndItemsFrom(items)
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
    const {clientX, clientY} = e
    console.log(123)

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
    const isTargetInContainer =
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']")

    if (isTargetInContainer) {
      setInContainer(true)
      setOverContainerNode(e.target.closest("[data-dnd-tvo='true']"))
    } else {
      setInContainer(false)
      setOverContainerNode(null)
      setOverNodeRectOnFirstTouch(null)
      setCurrentOverNode(null)
    }

    const isDndItem =
      e.target instanceof HTMLElement && e.target.dataset.dndItem

    if (isDndItem) {
      const overNodeRect = e.target.getBoundingClientRect()
      if (currentOverNode !== e.target) {
        setOverNodeRectOnFirstTouch(overNodeRect)
      }
      const isCursorStartPositionFromOverCard = getCursorPositionFromOverCard({
        clientX,
        overNodeRect,
      })
      setCursorPositionFromOverCard(isCursorStartPositionFromOverCard)
      setOverNode(e.target)
      setCurrentOverNode(e.target)
    }
    setCursorCoords({x: clientX, y: clientY})
    // IsNextPosition
  }

  const onDragEnd = (e: globalThis.MouseEvent) => {
    // setDragStart(false)
    // setStatusAfterDropAnimation(true)
    // const isTargetContainer =
    //   e.target instanceof HTMLElement &&
    //   e.target.closest("[data-dnd-tvo='true']")
    // setAnimationDragNodeAfterDrop({
    //   currentOverNode,
    //   overContainerNode,
    //   dragCard,
    //   dragNode,
    //   dragNodeRect,
    //   isCursorStartPositionFromOverCard,
    //   overCard,
    //   overNodeRectOnFirstTouch,
    //   duration: dndDuration,
    //   isTargetInContainer: !!isTargetContainer,
    // })
    // if (dragNode) {
    //   dragNode.addEventListener('transitionend', function transitionEnd() {
    //     document.querySelector('body')!.style.userSelect = ''
    //     let newItems
    //     if (dragCard && dndItemsFrom) {
    //       if (overCard && isTargetContainer) {
    //         newItems = inOneContainer({
    //           cards: dndItemsFrom,
    //           dragCard: dragCard,
    //           isNextPosition: !isCursorStartPositionFromOverCard,
    //           lastOverCard: overCard,
    //         })
    //       } else if (!currentOverNode && isTargetContainer) {
    //         newItems = getDataCurrentParent({
    //           cards: dndItemsFrom,
    //           dragCard: dragCard,
    //         })
    //       }
    //       dragNode.style.transform = ''
    //       dragNode.style.transition = ''
    //       dragNode.style.position = ''
    //       dragNode.style.pointerEvents = ''
    //       dragNode.style.top = ''
    //       dragNode.style.left = ''
    //       dragNode.style.zIndex = ''
    //       if (fromContainerNode) {
    //         fromContainerNode.style.width = ''
    //         fromContainerNode.childNodes.forEach(node => {
    //           if (node instanceof HTMLElement) {
    //             node.style.transform = ``
    //             node.style.transition = ''
    //           }
    //         })
    //       }
    //       if (newItems) {
    //         setData(newItems)
    //       }
    //     }
    //     //
    //     setCurrentOverNode(null)
    //     setCursorCoords(null)
    //     setDiffDragNodeAndCursor(null)
    //     setDragCard(null)
    //     setDragNode(null)
    //     setDragNodeRect(null)
    //     setFromContainerNode(null)
    //     setStatusAfterDropAnimation(false)
    //     setOverCard(null)
    //     setOverContainerNode(null)
    //     setOverNode(null)
    //     setOverNodeRectOnFirstTouch(null)
    //     setToContainerNode(null)
    //     dragNode.removeEventListener('transitionend', transitionEnd)
    //   })
    // }
  }

  useEffect(() => {
    if (isDragStart && dragNode) {
      window.addEventListener('mousemove', onDragMove)
      window.addEventListener('mouseup', onDragEnd)
    }

    return () => {
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('mousemove', onDragMove)
    }
  }, [
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

  return (
    <div
      data-dnd-tvo={true}
      data-shared-container-id={sharedId}
      onMouseDown={onDragStart}
      className={clsx(s.dndContainerWrapper, className)}
    >
      {children}
    </div>
  )
}

export default DndContainer

// TODO чистим оверноду что бы в аутсайд после овера по нодам не улитала функция сет дата?
