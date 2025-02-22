import clsx from "clsx";

import s from "./DndContainer.module.scss";
import type { DndContainerComponentType } from "./DndContainer.types";
import {
  DndItemDataType,
  inOneContainer,
  removeAllSelectionsFromDocument,
} from "../utils";
import { useDndStore } from "@/ItemsTest/State";
import { MouseEvent, useEffect } from "react";

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
  overNodeTransformOnFirstTouch,
}: {
  currentOverNode: HTMLElement | null;
  overNodeTransformOnFirstTouch: string | null;
  overContainerNode: HTMLElement | null;
  duration: number;
  dragNode: HTMLElement | null;
  overCard: DndItemDataType | null;
  isTargetInContainer: boolean;
  overNodeRectOnFirstTouch: DOMRect | null;
  dragNodeRect: DOMRect | null;
  dragCard: DndItemDataType | null;
  isCursorStartPositionFromOverCard: boolean;
}) => {
  // Куда мы кладем dragNode ?
  const isEndContainer = !overNodeRectOnFirstTouch && dragNodeRect;
  const isInContainer = isTargetInContainer && overContainerNode;
  const isOutsideContainer = !isTargetInContainer && !overContainerNode;
  const isAfterDragStartPos =
    dragCard &&
    overCard &&
    dragCard.order < overCard.order &&
    overNodeRectOnFirstTouch;
  const isBeforeDragStartPos =
    dragCard &&
    overCard &&
    dragCard.order > overCard.order &&
    overNodeRectOnFirstTouch;
  const isStartPositionOverCard = isCursorStartPositionFromOverCard;
  const isEndPositionFromOverCard = !isCursorStartPositionFromOverCard;
  // \Куда мы кладем dragNode

  if (dragNode && dragNodeRect) {
    dragNode.style.transition = ` ${duration / 1000}s`;

    if (isOutsideContainer) {
      dragNode.style.transform = `translate(0px, ${0}px)`;
      console.log("isOutsideContainer");
    }
    //
    else if (isInContainer) {
      console.log("isInContainer");
      //
      if (isEndContainer) {
        const { right } = overContainerNode.getBoundingClientRect();
        dragNode.style.transform = `translate(${
          right - dragNodeRect.x - dragNodeRect.width
        }px, ${0}px)`;
        console.log("isEndContainer");
      }
      //
      else if (isAfterDragStartPos && currentOverNode instanceof HTMLElement) {
        console.log("isAfterDragStartPos");

        if (isStartPositionOverCard) {
          let allLeftWidth = 0;
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex;
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect();
          overContainerNode.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex;
              if (tvoIndex && tvoOverNodeIndex && tvoIndex < tvoOverNodeIndex) {
                allLeftWidth += node.clientWidth;
              }
            }
          });

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x;
          dragNode.style.transform = `translate(${
            allLeftWidth - dragNodeRect.width - diffDragXAndContainerX
          }px, ${0}px)`;
          console.log("isStartPositionOverCard111");
        }
        //
        else if (isEndPositionFromOverCard) {
          let allLeftWidth = 0;
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex;
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect();
          overContainerNode.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex;
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                tvoIndex <= tvoOverNodeIndex
              ) {
                allLeftWidth += node.clientWidth;
              }
            }
          });

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x;
          dragNode.style.transform = `translate(${
            allLeftWidth - dragNodeRect.width - diffDragXAndContainerX
          }px, ${0}px)`;
          console.log("isEndPositionFromOverCard222");
        }
      }
      //
      else if (isBeforeDragStartPos && currentOverNode instanceof HTMLElement) {
        console.log("isBeforeDragStartPos");
        if (isStartPositionOverCard) {
          let allLeftWidth = 0;
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex;
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect();
          overContainerNode.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex;
              if (tvoIndex && tvoOverNodeIndex && tvoIndex < tvoOverNodeIndex) {
                allLeftWidth += node.clientWidth;
              }
            }
          });

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x;
          dragNode.style.transform = `translate(${
            allLeftWidth - diffDragXAndContainerX
          }px, ${0}px)`;

          console.log("isStartPositionOverCard333");
        }
        //
        else if (isEndPositionFromOverCard) {
          let allLeftWidth = 0;
          const tvoOverNodeIndex = currentOverNode.dataset.tvoIndex;
          const overContainerNodeRect =
            overContainerNode.getBoundingClientRect();
          overContainerNode.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const tvoIndex = node.dataset.tvoIndex;
              if (
                tvoIndex &&
                tvoOverNodeIndex &&
                tvoIndex <= tvoOverNodeIndex
              ) {
                allLeftWidth += node.clientWidth;
              }
            }
          });

          const diffDragXAndContainerX =
            dragNodeRect.x - overContainerNodeRect.x;
          dragNode.style.transform = `translate(${
            allLeftWidth - diffDragXAndContainerX
          }px, ${0}px)`;

          console.log("isEndPositionFromOverCard 44");
        }
      }
    }
  }
};

const DndContainer: DndContainerComponentType = (props) => {
  const { className = "", children, items, sharedId, setData } = props;
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
  } = useDndStore();

  const onDragStart = (e: MouseEvent<HTMLElement>) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    removeAllSelectionsFromDocument();

    if (target.dataset.dndItem === "dndItem") {
      const targetRect = target.getBoundingClientRect();
      const { height, width, x, y } = targetRect;
      const diffDragNodeAndCursorX = e.clientX - x;
      const diffDragNodeAndCursorY = e.clientY - y;
      target.style.position = "fixed";
      target.style.zIndex = "1000";
      target.style.left = e.clientX - diffDragNodeAndCursorX + "px";
      target.style.top = e.clientY - diffDragNodeAndCursorY + "px";
      target.style.pointerEvents = "none";

      currentTarget.style.width = currentTarget.offsetWidth + width + "px";

      setDragStart(true);
      setSharedContainerId(sharedId);
      setDndItemsFrom(items);
      setFromContainerNode(currentTarget);
      setDiffDragNodeAndCursor({
        x: diffDragNodeAndCursorX,
        y: diffDragNodeAndCursorY,
      });
      setDragNode(target);
      setDragNodeRect(targetRect);
      setCursorCoords({ x: e.clientX, y: e.clientY });
    }
  };

  const onDragMove = (e: globalThis.MouseEvent) => {
    // Трансфармируем перетаскиваемый элемент по курсору
    if (dragNode && dragNodeRect && diffDragNodeAndCursor) {
      dragNode.style.transform = `translate(${
        e.clientX - dragNodeRect.x - diffDragNodeAndCursor.x
      }px, ${e.clientY - dragNodeRect.y - diffDragNodeAndCursor.y}px)`;
    }

    //\ Трансфармируем перетаскиваемый элемент по курсору

    const isTargetInContainer =
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']");

    // Устанавливаем флаг isInContainer

    if (isTargetInContainer) {
      setInContainer(true);
      setOverContainerNode(e.target.closest("[data-dnd-tvo='true']"));
    } else {
      setInContainer(false);
      setOverContainerNode(null);
    }

    //\ Устанавливаем isInContainer

    // Очещяем overNodeRectOnFirstTouch и currentOverNode при выходе из контейнера

    if (!isTargetInContainer) {
      setOverNodeRectOnFirstTouch(null);
      setOverNodeTransformOnFirstTouch(null);
      setCurrentOverNode(null);
    }

    // \Очещяем фирст овер реакт и курент овер ноду при выходе из контейнера

    // Прочее
    if (e.target instanceof HTMLElement && e.target.dataset.dndItem) {
      if (currentOverNode !== e.target) {
        setOverNodeRectOnFirstTouch(e.target.getBoundingClientRect());
        setOverNodeTransformOnFirstTouch(e.target.style.transform);
      }
      setOverNode(e.target);
      setCurrentOverNode(e.target);
      const { width, x } = e.target.getBoundingClientRect();
      const middleOverNodeCoords = width / 2 + x;
      setCursorPositionFromOverCard(e.clientX < middleOverNodeCoords);
    }
    setCursorCoords({ x: e.clientX, y: e.clientY });
    // IsNextPosition
  };

  const onDragEnd = (e: globalThis.MouseEvent) => {
    setDragStart(false);

    setStatusAfterDropAnimation(true);

    const isTargetContainer =
      e.target instanceof HTMLElement &&
      e.target.closest("[data-dnd-tvo='true']");

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
      overNodeTransformOnFirstTouch,
    });
    // if (dragNode) {
    //   dragNode.addEventListener("transitionend", () => {

    //     if (dragCard && overCard && dndItemsFrom) {
    //       const newItems = inOneContainer({
    //         cards: dndItemsFrom,
    //         dragCard: dragCard,
    //         isNextPosition: !isCursorStartPositionFromOverCard,
    //         lastOverCard: overCard,
    //       });
    //       dragNode.style.transform = "";
    //       dragNode.style.position = "";
    //       dragNode.style.pointerEvents = "";
    //       dragNode.style.top = "";
    //       dragNode.style.left = "";
    //       dragNode.style.zIndex = "";
    //       setData(newItems);
    //     }
    //     setStatusAfterDropAnimation(false);
    //   });
    // }
  };

  useEffect(() => {
    if (isDragStart && dragNode) {
      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("mouseup", onDragEnd);
    } else {
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("mouseup", onDragEnd);
    }
    return () => {
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("mousemove", onDragMove);
    };
  }, [
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
  ]);
  return (
    <div
      data-dnd-tvo={true}
      data-shared-container-id={sharedId}
      onMouseDown={onDragStart}
      className={clsx(s.dndContainerWrapper, className)}
    >
      {children}
    </div>
  );
};

export default DndContainer;

// я имею трансформ он равен 0
// я имею позицию от 450 до 482
// я имею width от 32
// как узнать пределы позиции width
// я знаю что движение идет на снижение

// захожу трансформ 0  поз 455
// положение на экране
