import s from "./DndItem/DndItem.module.scss";
import ss from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { Children, cloneElement, DragEvent, useContext, useState } from "react";
import { getDataCurrentCard, getDataCurrentParent, sortDndFn } from "../utils";
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
    wrapperId,
    reverse,
  } = props;

  const {
    fromCard,
    setFromCard,
    fromCardNode,
    setFromItems,
    setToItems,
    dropNode,
    dropCard,
    setNextPosition,
    fromSharedClass,
    isNextPosition,
    toSharedClass,
    overNode,
    fromWrapperId,
    lastOverCard,
    setLastOverCard,
    fromItems,
    fromCardNodeRect,
    setDragStart,
    setTransition,
  } = useContext(DndContext);

  const [isTargetContainer, setTargetContainer] = useState(false);
  const [overCard, setOverCard] = useState<DndItemDataType | null>(null);

  const onDragStart = (e: DragEvent, card: DndItemDataType) => {
    e.stopPropagation();
    setFromCard(card);
    setDragStart(true);
    fromCardNode.current = e.currentTarget as HTMLDivElement;
    fromCardNodeRect.current = fromCardNode.current.getBoundingClientRect();

    setFromItems(items);
    fromSharedClass.current = sharedClass;
    if (wrapperId) {
      fromWrapperId.current = wrapperId;
    }
  };

  const onDragOver = (e: DragEvent, card: DndItemDataType) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTarget = e.currentTarget as HTMLDivElement;

    const isSharedTarget = currentTarget.closest(`.${fromSharedClass.current}`);

    if (
      fromCardNode.current &&
      isSharedTarget &&
      fromCardNode.current !== isSharedTarget
    ) {
      setOverCard(card);
      setLastOverCard(card);
      overNode.current = currentTarget;

      if (direction.name === "height") {
        const cursorPosition = e.clientY;
        const middleElem =
          currentTarget.getBoundingClientRect().height / 2 +
          currentTarget.getBoundingClientRect().y;
        setNextPosition(cursorPosition > middleElem);
      } else {
        const cursorPosition = e.clientX;
        const middleElem =
          currentTarget.getBoundingClientRect().width / 2 +
          currentTarget.getBoundingClientRect().x;
        setNextPosition(cursorPosition > middleElem);
      }
    }
  };

  const onDrop = (e: DragEvent, card: DndItemDataType) => {
    e.preventDefault();
    setTargetContainer(false);
    // e.stopPropagation();
    // dropCard.current = card;
    // dropNode.current = e.currentTarget as HTMLDivElement;
    // let middleElem;
    // let cursorPosition;
    // console.log("e.currentTarget", e.currentTarget);
    // console.log("sharedClass", sharedClass);
    // console.log("childSharedClass", childSharedClass);
    // console.log("wrapperId", wrapperId);
    // console.log("fromSharedClass", fromSharedClass);
    // console.log("toSharedClass", toSharedClass);
    // console.log("fromWrapperId", fromWrapperId);
    // console.log("setLastOverCard", setLastOverCard);

    // if (dropNode.current.closest(`.${fromSharedClass.current}`)) {
    //   if (direction.name === "height") {
    //     middleElem =
    //       dropNode.current.getBoundingClientRect().height / 2 +
    //       dropNode.current.getBoundingClientRect().y;

    //     cursorPosition = e.clientY;
    //   } else {
    //     middleElem =
    //       dropNode.current.getBoundingClientRect().width / 2 +
    //       dropNode.current.getBoundingClientRect().x;

    //     cursorPosition = e.clientX;
    //   }

    //   const isNext = cursorPosition >= middleElem;

    //   const cardOrder = isNext ? 0.1 : -0.1;

    //   const newState = items
    //     .map((cardPrev: DndItemDataType) => {
    //       if (cardPrev.id === fromCard?.id) {
    //         return { ...cardPrev, order: card.order + cardOrder };
    //       }
    //       return cardPrev;
    //     })
    //     .sort(sortDndFn)
    //     .map((prev: DndItemDataType, i: number) => ({ ...prev, order: i }));
    //   toSharedClass.current = sharedClass;
    //   setData(newState);
    //   setToItems(items);
    // }

    // if (
    //   setChildData &&
    //   childSharedClass &&
    //   childSharedClass === fromSharedClass.current
    // ) {
    //   setChildData(card.id);
    // }
  };

  const onDragEnd = (e: DragEvent) => {
    e.stopPropagation();

    setDragStart(false);

    setTargetContainer(false);

    setFromCard(null);
    overNode.current = null;
    if (wrapperId) {
      fromWrapperId.current = null;
    }
  };

  return (
    <div
      className={clsx(ss.dndWrapper, {
        [ss.dirY]: direction.name === "height",
        [ss.containerTarget]:
          isTargetContainer && sharedClass === fromSharedClass.current,
      })}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sharedClass === fromSharedClass.current) {
          setTargetContainer(true);
        }
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) return;

        if (sharedClass === fromSharedClass.current) {
          setTargetContainer(false);
        }
        setNextPosition(null);
        setOverCard(null);
        setLastOverCard(null);
        overNode.current = null;
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();

        if (
          fromSharedClass.current === sharedClass &&
          fromWrapperId.current === wrapperId
        ) {
          if (fromCard && fromItems && !lastOverCard) {
            setData(
              getDataCurrentParent({ dragCard: fromCard, fromCards: fromItems })
            );
          }
          if (
            fromCard &&
            fromItems &&
            lastOverCard &&
            isNextPosition !== null
          ) {
            console.log("getDataCurrentCard");
            setData(
              getDataCurrentCard({
                dragCard: fromCard,
                fromCards: fromItems,
                isNextPosition,
                lastOverCard,
              })
            );
          }
        }

        setTransition(false);
        setTimeout(() => {
          setTransition(true);
        }, 300);
        setTargetContainer(false);
      }}
      draggable
    >
      {children &&
        Children.map(children, (child) => {
          return cloneElement(child, {
            isTargetContainer,
            onDragEnd,
            onDragOver,
            onDragStart,
            onDrop,
            direction,
            sharedClass,
            wrapperId,
            overCard,
            reverse,
          });
        })}
    </div>
  );
};
export default Dnd;
