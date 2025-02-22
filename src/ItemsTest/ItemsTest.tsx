import s from "./ItemsTest.module.scss";
import type { ItemsTestComponentType } from "./ItemsTest.types";
import React, { useState } from "react";
import { DndItemDataType, inOneContainer } from "./Dnd/utils";
import DndContainer from "./Dnd/DndContainer/DndContainer";
import DndItem from "./Dnd/DndItems/DndItem";
import clsx from "clsx";

const items: DndItemDataType[] = [
  { id: "1", name: "1", order: 1 },
  { id: "2", name: "2", order: 2 },
  { id: "3", name: "3", order: 3 },
  { id: "4", name: "4", order: 4 },
  { id: "5", name: "5", order: 5 },
  { id: "6", name: "6", order: 6 },
  { id: "7", name: "7", order: 7 },
  { id: "8", name: "8", order: 8 },
];

const ItemsTest: ItemsTestComponentType = (props) => {
  const [data, setData] = useState<DndItemDataType[]>(items);
  const onClick = () => {
    const newItems = inOneContainer({
      cards: data,
      dragCard: { id: "2", order: 2 },
      isNextPosition: true,
      lastOverCard: { id: 6, order: 6 },
    });
    setData(newItems);
  };
  return (
    <>
      <button onClick={onClick}>asddsa</button>

      <DndContainer
        setData={(items: any) => {
          // console.log(items);
          // setData(items);
        }}
        items={data}
        sharedId="testSharedId"
      >
        {data.map((card, index) => (
          <DndItem index={index} card={card}>
            <div key={card.id} draggable="false" className={s.item}>
              <div style={{ pointerEvents: "none" }}>{card.name}</div>
            </div>
          </DndItem>
        ))}
      </DndContainer>
    </>
  );
};

export default ItemsTest;
