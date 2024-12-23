import s from "./DndItem/DndItem.module.scss";
import ss from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { Children, cloneElement, DragEvent, useContext, useState } from "react";
import { getDataCurrentCard, getDataCurrentParent, sortDndFn } from "../utils";
import { DndItemDataType } from "./DndItem/DndItem.types";
import clsx from "clsx";
import { DndContext } from "@/1Config/Providers/Dnd";
import useAnimationFrame from "@/6Shared/hooks/uiHooks/useAnimationFrame";
import { setScale, SetScaleType } from "@/Test/utils";

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

  const rafDisApp = useAnimationFrame<SetScaleType>();

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
    rafDisApp(setScale, 1000, {
      refThisNode: fromCardNode,
      direction: "disappearance",
    });
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
    if (fromCardNode.current) {
      rafDisApp(setScale, 1000, {
        refThisNode: fromCardNode,
        direction: "appearance",
      });
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
