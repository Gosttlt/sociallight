import clsx from "clsx";

import s from "./ItemsTest.module.scss";
import type { ItemsTestComponentType } from "./ItemsTest.types";
import { DndItemDataType } from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem.types";
import { useRef, useState } from "react";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";
import Test from "@/Test/Test";

const elems: Array<DndItemDataType & { name: string }> = [
  { id: "0", order: 0, name: "0" },
  { id: "1", order: 1, name: "1" },
  { id: "2", order: 2, name: "2" },
  { id: "3", order: 3, name: "3" },
  { id: "4", order: 4, name: "4" },
  { id: "5", order: 5, name: "5" },
  { id: "6", order: 6, name: "6" },
  { id: "7", order: 7, name: "7" },
  { id: "8", order: 8, name: "8" },
  { id: "9", order: 9, name: "9" },
  // { id: "10", order: 10, name: "10" },
  // { id: "11", order: 11, name: "11" },
  // { id: "12", order: 12, name: "12" },
  // { id: "13", order: 13, name: "13" },
  // { id: "14", order: 14, name: "14" },
  // { id: "15", order: 15, name: "15" },
  // { id: "16", order: 16, name: "16" },
  // { id: "17", order: 17, name: "17" },
  // { id: "18", order: 18, name: "18" },
];

const fn = (
  relativeToDragCard: "prev" | "next",
  cursorRelativeToElem: "start" | "end",
  elemRelativeToCursor: "prev" | "next" | "on",
  isContainer: boolean
) => {
  if (1 > 2) {
    return "left";
  } else if (1 > 2) {
    return "reverseLeft";
  } else if (1 > 2) {
    return "right";
  } else if (1 > 2) {
    return "reverseRight";
  }
};

const obj = {
  relativeToDragCard: {
    prev: "prev",
    next: "next",
  },
  cursorRelativeToElem: {
    start: "start",
    end: "end",
  },
  elemRelativeToCursor: {
    prev: "prev",
    next: "next",
    on: "on",
  },
};

const objee = {
  left: "left",
  reverseLeft: "reverseLeft",
  right: "right",
  reverseRight: "reverseRight",
};

const ItemsTest: ItemsTestComponentType = (props) => {
  const { className = "", children } = props;
  const [items, setItems] =
    useState<Array<DndItemDataType & { name: string }>>(elems);

  const fn = (fromData: Array<DndItemDataType & { name: string }>) => {
    setItems(fromData);
  };

  return (
    <div className={clsx(s.itemsTestWrapper, className)}>
      <Dnd
        direction={{
          name: "width",
          value: 404,
          paddingDefolt: 10,
          paddingStreach: 60,
        }}
        items={items}
        setData={fn}
        sharedClass="taskCategoryDnd"
        wrapperId="taskCategoryDnd"
      >
        {items.map((item) => (
          <DndItem data={item} key={item.id}>
            <div className={s.item} key={item.id}>
              {item.name}
            </div>
          </DndItem>
        ))}
      </Dnd>
    </div>
  );
};

export default ItemsTest;
