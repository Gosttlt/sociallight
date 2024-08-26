import s from "./DndItem/DndItem.module.scss";
import ss from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import {
  Children,
  cloneElement,
  DragEvent,
  useContext,
  useRef,
  useState,
} from "react";
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
  } = props;
  const [currentCard, setCurrentCard] = useState<null | DndItemDataType>(null);
  const currentCardNode = useRef<null | HTMLDivElement>(null);

  const { setExternalCurrentTarget, setFromItems, setToItems } =
    useContext(DndContext);

  const [isDragging, setDragging] = useState(false);
  const onDragStart = (e: DragEvent, card: DndItemDataType) => {
    e.stopPropagation();
    setDragging(true);
    setCurrentCard(card);
    currentCardNode.current = e.currentTarget as HTMLDivElement;
    getStyleDnd({ node: currentCardNode.current, type: "hidden", direction });
    setExternalCurrentTarget(e.currentTarget as HTMLDivElement);
    setFromItems(items);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTarget = e.currentTarget as HTMLDivElement;
    const dragEl = currentTarget.closest(`.${sharedClass}`);
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

    const currentTarget = e.currentTarget as HTMLDivElement;
    let middleElem;
    let cursorPosition;
    if (currentTarget.closest(`.${sharedClass}`)) {
      if (direction.name === "height") {
        middleElem =
          currentTarget.getBoundingClientRect().height / 2 +
          currentTarget.getBoundingClientRect().y;

        cursorPosition = e.clientY;
      } else {
        middleElem =
          currentTarget.getBoundingClientRect().width / 2 +
          currentTarget.getBoundingClientRect().x;

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

      setData(newState);
      getStyleDnd({
        node: currentTarget,
        type: "default",
        direction,
      });
      setToItems(items);
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
