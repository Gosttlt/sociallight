// import clsx from "clsx";

import Category from "@/4Features/Tasks/Category";

import s from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { DragEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";
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
    node.style.width = "212px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "stretch" && direction) {
    node.style.padding = "0px 10px";
    node.style[direction] = "200px";
    node.style.width = "412px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "hidden") {
    node.style.transform = "scale(0)";
    node.style.padding = "0";
    node.style.width = "0";
    node.style.opacity = "0";
  }
};

const sortFn = (a: CardType, b: CardType) => a.order - b.order;

const Dnd: DndComponentType = (props) => {
  const getStyleTrottle = useThrottle(getStyle, 3000);
  const [currentCard, setCurrentCard] = useState<null | CardType>(null);
  const [currentCardNode, setCurrentCardNode] = useState<null | HTMLDivElement>(
    null
  );
  const [isDragging, setDragging] = useState(false);

  const [cards, setCards] = useState<CardType[]>(cats.sort(sortFn));
  // элемент который взяли
  const onDragStart = (e: DragEvent, card: CardType) => {
    setDragging(true);
    setCurrentCard(card);
    setCurrentCardNode(e.currentTarget as HTMLDivElement);
    getStyle(e.currentTarget as HTMLDivElement, "hidden");
  };

  // элемент содержащий овер
  const onDragOver = (e: DragEvent, card?: CardType) => {
    e.preventDefault();

    const target = e.target as HTMLDivElement;
    const currentTarget = e.currentTarget as HTMLDivElement;
    const dragEl = currentTarget.closest(`.${s.dndItem}`);

    // Если элемент есть и элемент в таргете являеца драгИтемом и взятый элемент не являеца тем на кого смотрим
    if (currentCardNode && dragEl && currentCardNode !== dragEl) {
      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;
      const cursorX = e.clientX;

      const isPadding = cursorX > middleElem ? "paddingRight" : "paddingLeft";
      getStyle(currentTarget, "stretch", isPadding);
    }
  };
  const trtl = useThrottle(onDragOver, 0);

  const onDrop = (e: DragEvent, card: CardType) => {
    e.preventDefault();

    const target = e.target as HTMLDivElement;
    const currentTarget = e.currentTarget as HTMLDivElement;
    // currentTarget.style.transition = "none";
    // currentCardNode!.style.transition = "0.01s";
    // setTimeout(() => {
    //   currentTarget.style.transition = "0.3s";
    //   currentCardNode!.style.transition = "0.3s";
    // }, 1300);

    if (currentTarget.closest(`.${s.dndItem}`)) {
      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;
      const cursorX = e.clientX;

      const cardOrder = cursorX > middleElem ? 0.1 : -0.1;

      setCards(
        cards
          .map((cardPrev) => {
            if (cardPrev.id === currentCard?.id) {
              return { ...cardPrev, order: card.order + cardOrder };
            }
            return cardPrev;
          })
          .sort(sortFn)
          .map((prev, i) => ({ ...prev, order: i }))
      );

      getStyle(currentTarget, "default");
    }
  };

  const onDragEnd = (e: DragEvent) => {
    getStyle(e.currentTarget as HTMLDivElement, "default");
    setDragging(false);
  };

  const onDragLeave = (e: DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) return;
    if (e.currentTarget !== currentCardNode) {
      getStyle(e.currentTarget as HTMLDivElement, "default");
    }
  };

  return (
    <div className={s.dndWrapper}>
      {cards.map((card) => (
        <div
          key={card.id}
          onDragStart={(e) => onDragStart(e, card)}
          onDragOver={(e) => trtl(e, card)}
          onDragEnd={onDragEnd}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, card)}
          className={s.dndItem}
          draggable
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