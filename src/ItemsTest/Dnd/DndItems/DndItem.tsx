import clsx from "clsx";

import s from "./DndItem.module.scss";
import type { DndItemComponentType } from "./DndItem.types";
import { useDndStore } from "@/ItemsTest/State";
import { useRef } from "react";
import { DndItemDataType } from "../utils";

const getStyleFromWrapper = ({
  card,
  dragCard,
  isCursorStartPositionFromOverCard,
  overCard,
  isInContainer,
  isDragStart,
  thisNode,
  dragNodeRect,
}: {
  thisNode: HTMLDivElement | null;
  overCard?: DndItemDataType | null;
  card: DndItemDataType;
  dragCard?: DndItemDataType | null;
  isCursorStartPositionFromOverCard: boolean | null;
  isInContainer?: boolean | null;
  isDragStart: boolean;
  dragNodeRect: DOMRect | null;
}) => {
  if (dragCard && isDragStart && thisNode && dragNodeRect) {
    thisNode.style.transition = "1s";
    // Элементы относительно перетаскиваемого
    const isThisNodeBeforeDragCard = card.order < dragCard.order;
    const isThisNodeAfterDragCard = card.order > dragCard.order;

    if (isInContainer) {
      if (overCard) {
        // Курсор относительно элемента
        const isCursorBeforeThisNode = card.order < overCard.order;
        const isCursorAfterThisNode = card.order > overCard.order;
        const isCursorEqualThisNode = card.order === overCard.order;

        // Елемент отнасительно курсора
        // isNextPosition

        if (isThisNodeBeforeDragCard) {
          if (isCursorBeforeThisNode) {
            thisNode.style.transform = `translate(${0}px, 0px)`;
          }
          if (isCursorAfterThisNode) {
            thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
            }
            if (!isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${0}px, 0px)`;
            }
          }
        }
        if (isThisNodeAfterDragCard) {
          if (isCursorBeforeThisNode) {
            thisNode.style.transform = `translate(${0}px, 0px)`;
          }
          if (isCursorAfterThisNode) {
            thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
          }
          if (isCursorEqualThisNode) {
            if (isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
            }
            if (!isCursorStartPositionFromOverCard) {
              thisNode.style.transform = `translate(${0}px, 0px)`;
            }
          }
        }
      }
    } else {
      if (isThisNodeAfterDragCard) {
        // left
        thisNode.style.transform = `translate(${0}px, 0px)`;
      } else if (isThisNodeBeforeDragCard) {
        thisNode.style.transform = `translate(${0}px, 0px)`;
      }
    }
  }
};

const DndItem: DndItemComponentType = (props) => {
  const { className = "", children, card } = props;
  const ref = useRef<null | HTMLDivElement>(null);
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

  const onDrag = () => {
    setDragCard(card);
  };
  const onMouseMove = () => {
    if (isDragStart) {
      setOverCard(card);
    }
  };

  if (
    isDragStart &&
    ref.current &&
    ref.current !== dragNode &&
    dragNodeRect &&
    !!ref.current.style.transform
  ) {
    ref.current.dataset.dndItemReady = "true";
  }

  if (!isDragStart && ref.current) {
    delete ref.current.dataset.dndItemReady;
  }

  // if (ref.current && dragNode && dragNode === ref.current) {
  //   console.log(isDragStart);
  // }
  if (
    dragCard &&
    ref.current &&
    dragNodeRect &&
    !ref.current.style.transition &&
    !isInContainer
  ) {
    if (card.order > dragCard.order) {
      ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
    } else if (card.order < dragCard.order) {
      ref.current.style.transform = `translate(0px, 0px)`;
    }
  }
  if (
    ref.current &&
    dragCard &&
    dragNodeRect &&
    isStartAfterDropAnimation &&
    !isDragStart &&
    !isInContainer &&
    card.order > dragCard.order
  ) {
    ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
  }

  if (ref.current && ref.current.dataset.dndItemReady) {
    getStyleFromWrapper({
      card,
      isDragStart,
      isCursorStartPositionFromOverCard,
      thisNode: ref.current,
      dragCard,
      overCard,
      isInContainer,
      dragNodeRect,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseDown={onDrag}
      data-dnd-item="dndItem"
      className={clsx(s.dndItemWrapper, className)}
    >
      <div className={s.noEvent}>{children}</div>
    </div>
  );
};

export default DndItem;

// 1. Как узнать что это контейнер?
//  1) Повесить дата сет
// 2. Как узнать что это шаристый контейнер
//  2). Добавить датасет шар
// 3. Как дочернему элементу узнать что он в шарестом контейнер
// 4. Как дочернему элементу узнать что он из фрома
//  1) Проверить что он контейница во фроме
