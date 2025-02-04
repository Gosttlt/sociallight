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
import { getDataCurrentCard, getDataCurrentParent, sortDndFn } from "../utils";
import {
  DndItemDataType,
  RefLastOverCardForItemType,
} from "./DndItem/DndItem.types";
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
    isDragStart,
  } = useContext(DndContext);
  const [isTargetContainer, setTargetContainer] = useState(true);
  const [overCard, setOverCard] = useState<DndItemDataType | null>(null);
  const refLastOverCardForItem = useRef<RefLastOverCardForItemType | null>(
    null
  );

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
    overNode.current = e.currentTarget as HTMLDivElement;
    setOverCard(card);
    // e.preventDefault();
    // e.stopPropagation();
    // const currentTarget = e.currentTarget as HTMLDivElement;

    // const isSharedTarget = currentTarget.closest(`.${fromSharedClass.current}`);
    // if (isDragStart) {
    //   setOverCard(card);
    // }
    // if (
    //   fromCardNode.current &&
    //   isSharedTarget &&
    //   fromCardNode.current !== isSharedTarget
    // ) {
    //   setLastOverCard(card);

    //   overNode.current = currentTarget;

    //   if (direction.name === "height") {
    //     const cursorPosition = e.clientY;
    //     const middleElem =
    //       currentTarget.getBoundingClientRect().height / 2 +
    //       currentTarget.getBoundingClientRect().y;
    //     setNextPosition(cursorPosition > middleElem);
    //     refLastOverCardForItem.current = {
    //       card,
    //       positionOverCard: cursorPosition > middleElem ? "end" : "start",
    //     };
    //   } else {
    //     const cursorPosition = e.clientX;
    //     const middleElem =
    //       currentTarget.getBoundingClientRect().width / 2 +
    //       currentTarget.getBoundingClientRect().x;
    //     setNextPosition(cursorPosition > middleElem);
    //     refLastOverCardForItem.current = {
    //       card,
    //       positionOverCard: cursorPosition > middleElem ? "end" : "start",
    //     };
    //   }
    // }
  };

  const onDrop = (e: DragEvent, card: DndItemDataType) => {
    e.preventDefault();
    setTargetContainer(true);
  };

  const onDragEnd = (e: DragEvent) => {
    e.stopPropagation();
    refLastOverCardForItem.current = null;
    setDragStart(false);

    setTargetContainer(true);

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
            refLastOverCardForItem,
          });
        })}
    </div>
  );
};
export default Dnd;
