import clsx from "clsx";

import s from "./DndContainer.module.scss";
import type { DndContainerComponentType } from "./DndContainer.types";
import { getTransformValue, removeAllSelectionsFromDocument } from "../utils";

import { MouseEvent, useEffect } from "react";
import { useDndStore } from "..";

const DndContainer: DndContainerComponentType = (props) => {
  const { className = "", children, items, sharedId } = props;
  const {
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
  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget as HTMLDivElement;
    const target = e.target as HTMLDivElement;

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

    // Устанавливаем isInContainer
    if (
      (e.target instanceof HTMLDivElement && e.target.dataset.dndTvo) ||
      (e.target instanceof HTMLDivElement &&
        e.target.closest("[data-dnd-tvo='true']"))
    ) {
      setInContainer(true);
    } else {
      setInContainer(false);
    }

    // Прочее
    if (e.target instanceof HTMLDivElement && e.target.dataset.dndItemReady) {
      setOverNode(e.target);
      const { width, x } = e.target.getBoundingClientRect();
      const middleOverNodeCoords = width / 2 + x;
      setCursorPositionFromOverCard(e.clientX < middleOverNodeCoords);
    }
    setCursorCoords({ x: e.clientX, y: e.clientY });
    // IsNextPosition
  };
  const onDragEnd = (e: globalThis.MouseEvent) => {
    setDragStart(false);
    // setSharedContainerId(null);
    // setDndItemsFrom(null);
    // setFromContainerNode(null);
    // setDiffDragNodeAndCursor(null);
    // setDragNode(null);
    // setDragNodeRect(null);
    // setInContainer(false);
    // setCursorCoords(null);
    setStatusAfterDropAnimation(true);

    if (dragNode && e.target instanceof HTMLDivElement) {
      dragNode.style.transition = "1s";
      if (overNode && e.target.closest("[data-dnd-tvo='true']")) {
        const { right, top, left, width } = overNode.getBoundingClientRect();
        const transformValue = getTransformValue(overNode);
        console.log(transformValue);
        if (isCursorStartPositionFromOverCard) {
          console.log("start", width);
          dragNode.style.transform = `translate(0px, ${0}px)`;
          dragNode.style.left = `${left - width}px`;
          dragNode.style.top = `${top}px`;
        } else {
          console.log("end");
          console.log(overNode);
          console.log(isCursorStartPositionFromOverCard);

          dragNode.style.transform = `translate(0px, ${0}px)`;
          dragNode.style.left = `${right}px`;
          dragNode.style.top = `${top}px`;
        }
      } else {
        console.log("else");
        dragNode.style.transform = `translate(0px, ${0}px)`;
      }

      const setAfterOverCardEndAnimation = () => {};

      dragNode.addEventListener("transitionend", function () {
        console.log("Переход завершен!");
        setStatusAfterDropAnimation(false);
      });
    }
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
  }, [isDragStart, dragNode, overNode, isCursorStartPositionFromOverCard]);

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

// как найти ближайшего родителя с определенным дата атребутом
// button.closest("[data-id='123']");
// 1. Нужно завершить анимацию
//  1) со

// Кейсы
// 1) Выкинул за пределы котнейнера
// 2) Выкинул в соседний кнтейнер
// 3)
