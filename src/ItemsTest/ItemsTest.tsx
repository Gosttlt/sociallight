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
  // { id: "19", order: 19, name: "19" },
  // { id: "20", order: 20, name: "20" },
  // { id: "21", order: 21, name: "21" },
  // { id: "22", order: 22, name: "22" },
  // { id: "23", order: 23, name: "23" },
  // { id: "24", order: 24, name: "24" },
  // { id: "25", order: 25, name: "25" },
  // { id: "26", order: 26, name: "26" },
  // { id: "27", order: 27, name: "27" },
  // { id: "28", order: 28, name: "28" },
  // { id: "29", order: 29, name: "29" },
  // { id: "30", order: 30, name: "30" },
  // { id: "31", order: 31, name: "31" },
  // { id: "32", order: 32, name: "32" },
  // { id: "33", order: 33, name: "33" },
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
        {elems.map((item) => (
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
