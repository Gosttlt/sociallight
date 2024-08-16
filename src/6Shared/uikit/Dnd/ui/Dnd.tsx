import Category from "@/4Features/Tasks/Category";

import s from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { DragEvent, useRef, useState } from "react";
import clsx from "clsx";
import useThrottle from "@/6Shared/hooks/uiHooks/useThrottle";

type CardType = { name: string; id: string; order: number };
const cats = [
  { name: "Работа0", id: "clzmd1bym0000e9dlc2szkfgb1", order: 0 },
  { name: "Покупки1", id: "clzmd1bym0000e9dlc2szkfgb2", order: 1 },
  { name: "Лес5", id: "clzmd1bym0000e9dlc2szkfgb6", order: 5 },
  { name: "Дом2", id: "clzmd1bym0000e9dlc2szkfgb3", order: 2 },
  { name: "Улица3", id: "clzmd1bym0000e9dlc2szkfgb4", order: 3 },
  { name: "Занятия4", id: "clzmd1bym0000e9dlc2szkfgb5", order: 4 },
];

type StyleType = "default" | "stretch" | "hidden";
const getStyle = (
  node: HTMLDivElement,
  type: StyleType,
  direction?: "paddingLeft" | "paddingRight"
) => {
  if (type === "default") {
    node.style.padding = "0px 10px";
    node.style.width = "192px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "stretch" && direction) {
    node.style.padding = "0px 10px";
    node.style[direction] = "200px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "hidden") {
    node.style.padding = "0";
    node.style.width = "0";
    node.style.transform = "scale(0)";
    node.style.opacity = "0";
  }
};

const sortFn = (a: CardType, b: CardType) => a.order - b.order;

const fn = (currentTarget: HTMLDivElement) => {
  const middleElem =
    currentTarget.getBoundingClientRect().width / 2 +
    currentTarget.getBoundingClientRect().x;

  return middleElem;
};

const Dnd: DndComponentType = (props) => {
  const { direction = "direcrionX" } = props;
  const [currentCard, setCurrentCard] = useState<null | CardType>(null);
  const currentCardNode = useRef<null | HTMLDivElement>(null);
  const [isDragging, setDragging] = useState(false);

  const asd = useThrottle(getStyle, 1);

  const [cards, setCards] = useState<CardType[]>(cats.sort(sortFn));
  const onDragStart = (e: DragEvent, card: CardType) => {
    setDragging(true);
    setCurrentCard(card);
    currentCardNode.current = e.currentTarget as HTMLDivElement;
    getStyle(currentCardNode.current, "hidden");
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
      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;

      const cursorX = e.clientX;
      const isPadding = cursorX > middleElem ? "paddingRight" : "paddingLeft";
      asd(currentTarget, "stretch", isPadding);
    }
  };

  const onDrop = (e: DragEvent, card: CardType) => {
    e.preventDefault();

    const currentTarget = e.currentTarget as HTMLDivElement;

    if (currentTarget.closest(`.${s.dndItem}`)) {
      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;
      const cursorX = e.clientX;

      const isNext = cursorX >= middleElem;
      const dragSortFn = (cardMapEl: CardType) => {
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
      const newState = cards.map(dragSortFn).sort(sortFn);
      setCards(newState);
      getStyle(currentTarget, "default");

      if (!isNext) {
        currentTarget.classList.add(s[direction]);
        setTimeout(() => {
          currentTarget.classList.remove(s[direction]);
        }, 300);
      }
    }
  };

  const onDragLeave = (e: DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) return;
    if (e.currentTarget !== currentCardNode.current) {
      getStyle(e.currentTarget as HTMLDivElement, "default");
    }
  };

  const onDragEnd = (e: DragEvent) => {
    getStyle(e.currentTarget as HTMLDivElement, "default");
    setDragging(false);
  };

  return (
    <div className={s.dndWrapper}>
      {cards.map((card) => (
        <div
          key={card.id}
          onDragStart={(e) => onDragStart(e, card)}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, card)}
          className={clsx(s.dndItem)}
          draggable
          id={card.name}
        >
          <div className={clsx({ [s.noEvent]: isDragging })}>
            <Category
              id={card.id}
              isActive={false}
              name={card.name}
              onClick={() => {}}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Dnd;
