import s from "./DndItem/DndItem.module.scss";
import ss from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { Children, cloneElement, DragEvent, useContext, useState } from "react";
import { DndStylePadding, getStyleDnd, sortDndFn } from "../utils";
import { DndItemDataType } from "./DndItem/DndItem.types";
import clsx from "clsx";
import { DndContext } from "@/1Config/Providers/Dnd";

const Dnd: DndComponentType = (props) => {
  const {
    direction,
    children,
    items,
    setData,
    sharedClass = s.dndDefaultClass,
    setChildData,
    childSharedClass,
  } = props;

  const {
    currentCard,
    setCurrentCard,
    currentCardNode,
    setFromItems,
    setToItems,
    dropNode,
    dropCard,
    setPosition,
    fromSharedClass,
    toSharedClass,
  } = useContext(DndContext);

  const [isDragging, setDragging] = useState(false);
  const onDragStart = (e: DragEvent, card: DndItemDataType) => {
    e.stopPropagation();
    setDragging(true);
    setCurrentCard(card);
    currentCardNode.current = e.currentTarget as HTMLDivElement;
    getStyleDnd({ node: currentCardNode.current, type: "hidden", direction });
    setFromItems(items);
    fromSharedClass.current = sharedClass;
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTarget = e.currentTarget as HTMLDivElement;
    const dragEl = currentTarget.closest(`.${fromSharedClass.current}`);
    if (
      currentCardNode.current &&
      dragEl &&
      currentCardNode.current !== dragEl
    ) {
      let isPadding: DndStylePadding;

      if (direction.name === "height") {
        const cursorPosition = e.clientY;
        const middleElem =
          currentTarget.getBoundingClientRect().height / 2 +
          currentTarget.getBoundingClientRect().y;

        isPadding =
          cursorPosition < middleElem ? "paddingTop" : "paddingBottom";
      } else {
        const cursorPosition = e.clientX;

        const middleElem =
          currentTarget.getBoundingClientRect().width / 2 +
          currentTarget.getBoundingClientRect().x;
        isPadding =
          cursorPosition > middleElem ? "paddingRight" : "paddingLeft";
      }
      getStyleDnd({
        node: currentTarget,
        type: "stretch",
        paddingDirection: isPadding,
        direction,
      });
    }
  };

  const onDrop = (e: DragEvent, card: DndItemDataType) => {
    e.preventDefault();
    e.stopPropagation();
    dropCard.current = card;
    dropNode.current = e.currentTarget as HTMLDivElement;
    let middleElem;
    let cursorPosition;
    if (dropNode.current.closest(`.${fromSharedClass.current}`)) {
      if (direction.name === "height") {
        middleElem =
          dropNode.current.getBoundingClientRect().height / 2 +
          dropNode.current.getBoundingClientRect().y;

        cursorPosition = e.clientY;
      } else {
        middleElem =
          dropNode.current.getBoundingClientRect().width / 2 +
          dropNode.current.getBoundingClientRect().x;

        cursorPosition = e.clientX;
      }

      const isNext = cursorPosition >= middleElem;

      const cardOrder = isNext ? 0.1 : -0.1;

      const newState = items
        .map((cardPrev: DndItemDataType) => {
          if (cardPrev.id === currentCard?.id) {
            return { ...cardPrev, order: card.order + cardOrder };
          }
          return cardPrev;
        })
        .sort(sortDndFn)
        .map((prev: DndItemDataType, i: number) => ({ ...prev, order: i }));
      toSharedClass.current = sharedClass;
      setData(newState);
      getStyleDnd({
        node: dropNode.current,
        type: "default",
        direction,
      });
      setPosition(isNext);
      setToItems(items);
    }
    if (
      setChildData &&
      childSharedClass &&
      childSharedClass === fromSharedClass.current
    ) {
      setChildData(card.id);
    }
  };
  const onDragLeave = (e: DragEvent) => {
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) return;
    if (e.currentTarget !== currentCardNode.current) {
      getStyleDnd({
        node: e.currentTarget as HTMLDivElement,
        type: "default",
        direction,
      });
    }
  };

  const onDragEnd = (e: DragEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      getStyleDnd({
        node: currentCardNode.current as HTMLDivElement,
        type: "default",
        direction,
      });
    }, 100);
    setDragging(false);
  };

  return (
    <div
      className={clsx(ss.dndWrapper, {
        [ss.dirY]: direction.name === "height",
      })}
    >
      {children &&
        Children.map(children, (child) => {
          return cloneElement(child, {
            isDragging,
            onDragEnd,
            onDragLeave,
            onDragOver,
            onDragStart,
            onDrop,
            direction,
            sharedClass,
          });
        })}
    </div>
  );
};
export default Dnd;
