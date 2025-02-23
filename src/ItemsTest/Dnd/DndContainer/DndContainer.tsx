import clsx from 'clsx'

import s from './DndContainer.module.scss'
import type {DndContainerComponentType} from './DndContainer.types'
import {
  DndItemDataType,
  getDataCurrentParent,
  inOneContainer,
  removeAllSelectionsFromDocument,
} from '../utils'
import {useDndStore} from '@/ItemsTest/State'
import {MouseEvent, useEffect} from 'react'

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

const DndContainer: DndContainerComponentType = props => {
  const {className = '', children, items, sharedId, setData} = props
  const {
    overNodeTransformOnFirstTouch,
    setOverNodeTransformOnFirstTouch,
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

      if (target.dataset.dndItem) {
        const targetRect = target.getBoundingClientRect()
        const {height, width, x, y} = targetRect
        const diffDragNodeAndCursorX = e.clientX - x
        const diffDragNodeAndCursorY = e.clientY - y
        target.style.position = 'fixed'
        target.style.zIndex = '1000'
        target.style.left = e.clientX - diffDragNodeAndCursorX + 'px'
        target.style.top = e.clientY - diffDragNodeAndCursorY + 'px'
        target.style.pointerEvents = 'none'

        currentTarget.childNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            const tvoIndex = node.dataset.tvoIndex
            const dragNodeIndex = target.dataset.tvoIndex
            if (tvoIndex && dragNodeIndex && tvoIndex > dragNodeIndex) {
              node.style.transform = `translate(${targetRect.width}px, 0px)`
            }
          }
        })

        currentTarget.style.width = currentTarget.offsetWidth + width + 'px'

        setDragStart(true)
        setCurrentOverNode(target)
        setSharedContainerId(sharedId)
        setDndItemsFrom(items)
        setFromContainerNode(currentTarget)
        setDiffDragNodeAndCursor({
          x: diffDragNodeAndCursorX,
          y: diffDragNodeAndCursorY,
        })
        setDragNode(target)
        setDragNodeRect(targetRect)
        setCursorCoords({x: e.clientX, y: e.clientY})
      }
    }
  }

  const onDragMove = (e: globalThis.MouseEvent) => {
    // Трансфармируем перетаскиваемый элемент по курсору
    if (dragNode && dragNodeRect && diffDragNodeAndCursor) {
      dragNode.style.transform = `translate(${
        e.clientX - dragNodeRect.x - diffDragNodeAndCursor.x
      }px, ${e.clientY - dragNodeRect.y - diffDragNodeAndCursor.y}px)`
    }

    //\ Трансфармируем перетаскиваемый элемент по курсору

    const isTargetInContainer =
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']")

    // Устанавливаем флаг isInContainer

    if (isTargetInContainer) {
      setInContainer(true)
      setOverContainerNode(e.target.closest("[data-dnd-tvo='true']"))
    } else {
      setInContainer(false)
      setOverContainerNode(null)
      setOverNodeRectOnFirstTouch(null)
      setOverNodeTransformOnFirstTouch(null)
      setCurrentOverNode(null)
    }

    //\ Устанавливаем isInContainer

    // \Очещяем фирст овер реакт и курент овер ноду при выходе из контейнера

    // очищяем оверкард
    // const isHtmlElement = e.target instanceof HTMLElement
    // if (!isHtmlElement || !e.target.dataset.dndItem) {
    //   setOverCard(null)
    // }

    // Прочее
    if (e.target instanceof HTMLElement && e.target.dataset.dndItem) {
      if (currentOverNode !== e.target) {
        setOverNodeRectOnFirstTouch(e.target.getBoundingClientRect())
        setOverNodeTransformOnFirstTouch(e.target.style.transform)
      }
      setOverNode(e.target)
      setCurrentOverNode(e.target)
      const {width, x} = e.target.getBoundingClientRect()
      const middleOverNodeCoords = width / 2 + x
      setCursorPositionFromOverCard(e.clientX < middleOverNodeCoords)
    }
    setCursorCoords({x: e.clientX, y: e.clientY})
    // IsNextPosition
  }

  const onDragEnd = (e: globalThis.MouseEvent) => {
    setDragStart(false)

    setStatusAfterDropAnimation(true)

    const isTargetContainer =
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']")

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
    if (dragNode) {
      dragNode.addEventListener('transitionend', function transitionEnd() {
        let newItems
        if (dragCard && dndItemsFrom) {
          if (overCard && isTargetContainer) {
            newItems = inOneContainer({
              cards: dndItemsFrom,
              dragCard: dragCard,
              isNextPosition: !isCursorStartPositionFromOverCard,
              lastOverCard: overCard,
            })
          } else if (!currentOverNode && isTargetContainer) {
            newItems = getDataCurrentParent({
              cards: dndItemsFrom,
              dragCard: dragCard,
            })
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
          if (newItems) {
            setData(newItems)
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
        dragNode.removeEventListener('transitionend', transitionEnd)
      })
    }
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
    overNodeTransformOnFirstTouch,
    setOverNodeTransformOnFirstTouch,
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
