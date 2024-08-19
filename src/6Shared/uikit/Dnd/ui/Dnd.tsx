import Category from "@/4Features/Tasks/Category";

import s from "./DndItem/DndItem.module.scss";
import ss from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { Children, cloneElement, DragEvent, useRef, useState } from "react";
import { getStyleDnd, sortDndFn } from "../utils";
import { DndItemDataType } from "./DndItem/DndItem.types";

const Dnd: DndComponentType = (props) => {
  const { direction, children, items, setData } = props;
  const [currentCard, setCurrentCard] = useState<null | DndItemDataType>(null);
  const currentCardNode = useRef<null | HTMLDivElement>(null);

  const [isDragging, setDragging] = useState(false);

  const onDragStart = (e: DragEvent, card: DndItemDataType) => {
    setDragging(true);
    setCurrentCard(card);
    currentCardNode.current = e.currentTarget as HTMLDivElement;
    getStyleDnd({ node: currentCardNode.current, type: "hidden" });
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();

    const currentTarget = e.currentTarget as HTMLDivElement;
    const dragEl = currentTarget.closest(`.${s.dndItem}`);
    if (
      currentCardNode.current &&
      dragEl &&
      currentCardNode.current !== dragEl
    ) {
      const cursorX = e.clientX;

      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;

      const isPadding = cursorX > middleElem ? "paddingRight" : "paddingLeft";
      getStyleDnd({
        node: currentTarget,
        type: "stretch",
        paddingDirection: isPadding,
      });
    }
  };

  const onDrop = (e: DragEvent, card: DndItemDataType) => {
    e.preventDefault();

    const currentTarget = e.currentTarget as HTMLDivElement;

    if (currentTarget.closest(`.${s.dndItem}`)) {
      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;
      const cursorX = e.clientX;

      const isNext = cursorX >= middleElem;
      const dragSortFn = (cardMapEl: DndItemDataType) => {
        if (cardMapEl.id === card.id) {
          if (card.order > currentCard!.order) {
            if (isNext) {
              return { ...cardMapEl, order: card.order - 1 };
            } else {
              return { ...cardMapEl, order: card.order };
            }
          } else {
            if (isNext) {
              return { ...cardMapEl, order: card.order };
            } else {
              return { ...cardMapEl, order: card.order + 1 };
            }
          }
        } else if (cardMapEl.id === currentCard?.id) {
          if (card.order > currentCard!.order) {
            if (isNext) {
              return { ...cardMapEl, order: card.order };
            } else {
              return { ...cardMapEl, order: card.order - 1 };
            }
          } else {
            if (isNext) {
              return { ...cardMapEl, order: card.order + 1 };
            } else {
              return { ...cardMapEl, order: card.order };
            }
          }
        } else {
          if (
            card.order > currentCard!.order &&
            cardMapEl.order > currentCard!.order &&
            cardMapEl.order < card.order
          ) {
            return { ...cardMapEl, order: cardMapEl.order - 1 };
          } else if (
            card.order < currentCard!.order &&
            cardMapEl.order < currentCard!.order &&
            cardMapEl.order > card.order
          ) {
            return { ...cardMapEl, order: cardMapEl.order + 1 };
          }
          return cardMapEl;
        }
      };
      const newState = items.map(dragSortFn).sort(sortDndFn);
      setData(newState);
      getStyleDnd({
        node: currentTarget,
        type: "default",
        direction,
      });

      if (!isNext) {
        currentTarget.classList.add(s[`direction${direction.name}`]);
        setTimeout(() => {
          currentTarget.classList.remove(s[`direction${direction.name}`]);
        }, 300);
      }
    }
  };
  const onDragLeave = (e: DragEvent) => {
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
    getStyleDnd({
      node: e.currentTarget as HTMLDivElement,
      type: "default",
      direction,
    });
    setDragging(false);
  };

  return (
    <div className={ss.dndWrapper}>
      {children &&
        Children.map(children, (child) => {
          return cloneElement(child, {
            isDragging,
            onDragEnd,
            onDragLeave,
            onDragOver,
            onDragStart,
            onDrop,
          });
        })}
    </div>
  );
};
export default Dnd;
