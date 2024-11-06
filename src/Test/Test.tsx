"use client";
import clsx from "clsx";

import s from "./Test.module.scss";
import type { TestComponentType } from "./Test.types";
import {
  DragEvent,
  MutableRefObject,
  RefObject,
  useRef,
  useState,
} from "react";
import { getDataCurrentCard } from "@/6Shared/uikit/Dnd/utils";
import useAnimationFrame from "@/6Shared/hooks/uiHooks/useAnimationFrame";
import { dndAppearance, dndDisappearance } from "./utils";

type DndItemDataType = { id: number; order: number };

const itemss: Array<DndItemDataType & { name: string }> = [
  { order: 0, id: 0, name: "asd0" },
  { order: 1, id: 1, name: "asd1" },
  { order: 2, id: 2, name: "asd2" },
  { order: 3, id: 3, name: "asd3" },
  { order: 4, id: 4, name: "asd4" },
  { order: 5, id: 5, name: "asd5" },
];

const getStyleFromWrapper = ({
  data,
  fromCard,
  isNextPosition,
  overCard,
  isTargetContainer,
  backStyle,
  frontStyle,
}: {
  overCard?: DndItemDataType | null;
  data: DndItemDataType;
  fromCard: DndItemDataType;
  isNextPosition: boolean | null;
  isTargetContainer?: boolean | null;
  backStyle: string;
  frontStyle: string;
  isDragStart: boolean;
  isTransition: boolean;
}) => {
  let style = {};
  const backStyleObj = {
    transform: backStyle,
    background: "red",
    transition: "1s",
  };
  const frontStyleObj = {
    transform: frontStyle,
    background: "red",
    transition: "1s",
  };

  if (!overCard && data.order > fromCard.order) {
    style = backStyleObj;
  } else if (isTargetContainer && overCard) {
    if (isNextPosition) {
      if (data.order > fromCard.order && data.order <= overCard.order) {
        style = backStyleObj;
      } else if (data.order < fromCard.order && data.order > overCard.order) {
        style = frontStyleObj;
      }
    } else if (isNextPosition === false) {
      if (data.order > fromCard.order && data.order < overCard.order) {
        style = backStyleObj;
      } else if (data.order < fromCard.order && data.order >= overCard.order) {
        style = frontStyleObj;
      }
    }
  }

  return style;
};

const Test: TestComponentType = (props) => {
  const { className = "", children } = props;
  const [items, setItems] = useState<Array<any>>(
    itemss.map((item) => ({ ...item, ref: useRef(null) }))
  );
  const [draggedElement, setDraggedElement] = useState<null | DndItemDataType>(
    null
  );
  const refCurrent = useRef<null | HTMLDivElement>(null);
  const rafDisApp = useAnimationFrame(refCurrent);

  const onDragStart = (e: DragEvent, card: DndItemDataType) => {
    const curentTarget = e.currentTarget as HTMLDivElement;
    refCurrent.current = curentTarget;
    rafDisApp(dndDisappearance, 300);
    setDraggedElement(card);
  };

  const dragEnd = (e: DragEvent, card: DndItemDataType) => {
    rafDisApp(dndAppearance, 300);
    setDraggedElement(null);
  };

  const dragOver = (e: DragEvent) => {
    items.forEach((item) => {
      if (draggedElement && item.id > draggedElement.id) {
        // item.ref.current.classList.remove(s.removeTransformLeft);
        // item.ref.current.classList.add(s.transformLeft);
      }
    });
  };
  const ref = useRef<null | HTMLDivElement>(null);

  return (
    <div>
      <button
        onClick={() => {
          rafDisApp(dndAppearance, 2000);
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          rafDisApp(dndDisappearance, 2000);
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          asd();
        }}
      >
        click3
      </button>
      <div ref={ref} className={clsx(s.lol, s.lol1)}>
        asdasdas
      </div>
      <ul className={s.wrapper} onDragOver={dragOver}>
        {items.map((item) => (
          <div
            ref={item.ref}
            onDragStart={(e) => onDragStart(e, item)}
            onDragEnd={(e) => dragEnd(e, item)}
            key={item.id}
            draggable
            className={clsx(s.item)}
          >
            {item.name}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Test;
