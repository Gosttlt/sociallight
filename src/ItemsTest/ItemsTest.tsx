import clsx from "clsx";

import s from "./ItemsTest.module.scss";
import type { ItemsTestComponentType } from "./ItemsTest.types";
import { DndItemDataType } from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem.types";
import { useRef, useState } from "react";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";

const elems: Array<DndItemDataType & { name: string }> = [
  { id: "0", order: 0, name: "0" },
  { id: "1", order: 1, name: "1" },
  { id: "2", order: 2, name: "2" },
  { id: "3", order: 3, name: "3" },
  { id: "4", order: 4, name: "4" },
  { id: "5", order: 5, name: "5" },
];

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
