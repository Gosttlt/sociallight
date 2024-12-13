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
import { dndAppearance, dndDisappearance, dndTransformLeft } from "./utils";

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

type СbTransformItemArgsType = {
  refCurrentWidth: MutableRefObject<number | null>;
  firstElem: HTMLDivElement;
  direction:
    | "left"
    | "reverseLeft"
    | "right"
    | "reverseRight"
    | "top"
    | "reverseTop"
    | "bot"
    | "reverseBot";
};

const cbTransformItem = (
  progress: number,
  duration: number,
  { refCurrentWidth, firstElem, direction }: СbTransformItemArgsType
) => {
  if (refCurrentWidth.current) {
    if (direction === "left") {
      const result = (progress / duration) * refCurrentWidth.current;
      firstElem.style.transform = `translateX(${-result}px)`;
    } else if (direction === "reverseLeft") {
      const result =
        refCurrentWidth.current -
        (progress / duration) * refCurrentWidth.current;

      firstElem.style.transform = `translateX(${-result}px)`;
    } else if (direction === "right") {
      const result = (progress / duration) * refCurrentWidth.current;

      firstElem.style.transform = `translateX(${result}px)`;
    } else if (direction === "reverseRight") {
      const result =
        refCurrentWidth.current -
        (progress / duration) * refCurrentWidth.current;

      firstElem.style.transform = `translateX(${result}px)`;
    }
  }
};

const Test: TestComponentType = (props) => {
  const { className = "", children } = props;
  const [items, setItems] = useState<Array<any>>(
    itemss.map((item) => ({ ...item, ref: useRef(null) }))
  );
  const [draggedElement, setDraggedElement] = useState<null | DndItemDataType>(
    null
  );
  const refCurrentWidth = useRef<null | number>(null);
  const refCurrent = useRef<null | HTMLDivElement>(null);
  const rafDisApp = useAnimationFrame();
  const rafTransform = useAnimationFrame<СbTransformItemArgsType>();

  const onDragStart = (e: DragEvent, card: DndItemDataType) => {
    const curentTarget = e.currentTarget as HTMLDivElement;
    refCurrentWidth.current = curentTarget.getBoundingClientRect().width;
    refCurrent.current = curentTarget;
    rafDisApp(dndDisappearance, 300, refCurrent);
    setDraggedElement(card);
  };

  const dragEnd = (e: DragEvent, card: DndItemDataType) => {
    rafDisApp(dndAppearance, 300, refCurrent);
    setDraggedElement(null);
  };

  const dragOver = (e: DragEvent) => {
    items.forEach((item) => {
      if (draggedElement && item.id > draggedElement.id) {
      }
    });
  };
  const ref = useRef<null | HTMLDivElement>(null);
  const firstElem = items[0].ref.current as HTMLDivElement;
  return (
    <div>
      <button
        onClick={() => {
          rafTransform(cbTransformItem, 1000, {
            firstElem,
            refCurrentWidth,
            direction: "left",
          });
        }}
      >
        click1
      </button>
      <button
        onClick={() => {
          rafTransform(cbTransformItem, 1000, {
            firstElem,
            refCurrentWidth,
            direction: "reverseLeft",
          });
        }}
      >
        click2
      </button>
      <button
        onClick={() => {
          rafTransform(cbTransformItem, 1000, {
            firstElem,
            refCurrentWidth,
            direction: "right",
          });
        }}
      >
        click3
      </button>
      <button
        onClick={() => {
          rafTransform(cbTransformItem, 1000, {
            firstElem,
            refCurrentWidth,
            direction: "reverseRight",
          });
        }}
      >
        click4
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

// @ts-ignore
Array.prototype.castomMap = function (cb) {
  console.log(this);
};
// @ts-ignore
[1, 2, 3].castomMap((el, i) => el + i);
