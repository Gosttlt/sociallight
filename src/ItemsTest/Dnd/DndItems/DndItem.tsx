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
  dndDuration,
  overNodeRectOnFirstTouch,
}: {
  thisNode: HTMLElement | null;
  overCard?: DndItemDataType | null;
  card: DndItemDataType;
  dragCard?: DndItemDataType | null;
  isCursorStartPositionFromOverCard: boolean | null;
  isInContainer?: boolean | null;
  isDragStart: boolean;
  dragNodeRect: DOMRect | null;
  overNodeRectOnFirstTouch: DOMRect | null;
  dndDuration: number;
}) => {
  if (dragCard && isDragStart && thisNode && dragNodeRect) {
    thisNode.style.transition = `${dndDuration / 1000}s`;
    // Элементы относительно перетаскиваемого
    const isThisNodeBeforeDragCard = card.order < dragCard.order;
    const isThisNodeAfterDragCard = card.order > dragCard.order;

    if (isInContainer) {
      if (overCard && overNodeRectOnFirstTouch) {
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
  const { className = "", children, card, index } = props;
  const ref = useRef<null | HTMLDivElement>(null);

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

  const onDrag = () => {
    setDragCard(card);
  };
  const onMouseMove = () => {
    if (isDragStart) {
      setOverCard(card);
    }
  };

  // Дать трансформ без транзишена
  // Както узнать что дали
  // Повесить транзишены
  // Продолжеть анимацию

  //  Если нету transition то вешаем и делаем первый мув элементами что бы избежать дерганья в начале из за позишена fixed
  if (
    dragCard &&
    ref.current &&
    dragNodeRect &&
    !ref.current.style.transition &&
    !isInContainer &&
    !ref.current.dataset.dndItemReady &&
    ref.current !== dragNode
  ) {
    if (card.order > dragCard.order) {
      ref.current.style.transform = `translate(${dragNodeRect.width}px, 0px)`;
    } else if (card.order < dragCard.order) {
      ref.current.style.transform = `translate(0px, 0px)`;
    }
  }

  //  Если есть трансформ то можно перетаскивать
  if (
    isDragStart &&
    ref.current &&
    ref.current !== dragNode &&
    dragNodeRect &&
    !!ref.current.style.transform &&
    !ref.current.dataset.dndItemReady
  ) {
    console.log("first move");
    ref.current.dataset.dndItemReady = "true";
  }

  // анимация после подготовительных работ

  if (ref.current && ref.current.dataset.dndItemReady) {
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
    });
  }

  // После дропа за пределы контейнера возвращяем this ноды и ждем пока позишен станет не фиксед
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

  //По оканчанию драги снемаем датасет
  if (!isDragStart && ref.current) {
    delete ref.current.dataset.dndItemReady;
  }

  return (
    <div
      ref={ref}
      data-tvo-index={index}
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
