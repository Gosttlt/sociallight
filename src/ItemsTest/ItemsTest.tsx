import clsx from "clsx";

import s from "./ItemsTest.module.scss";
import type { ItemsTestComponentType } from "./ItemsTest.types";
import React, { MouseEvent, useRef, useState } from "react";
import {
  DndItemDataType,
  getSortedDataDnd,
  removeAllSelectionsFromDocument,
} from "./Dnd/utils";
import { useDndStore } from "./State";
import DndContainer from "./Dnd/DndContainer/DndContainer";
import DndItem from "./Dnd/DndItems/DndItem";

const data: DndItemDataType[] = [
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
  const { className = "", children } = props;

  const {
    isDragStart,
    setDragStart,
    dragNode,
    setDragNode,
    dragNodeRect,
    setDragNodeRect,
    diffDragNodeAndCursor,
    setDiffDragNodeAndCursor,
    dragCard,
    setDragCard,
    overNode,
    setOverNode,
    overCard,
    setOverCard,
    fromContainerNode,
    setFromContainerNode,
    toContainerNode,
    setToContainerNode,
    overContainerNode,
    setOverContainerNode,
    dndItemsFrom,
    setDndItemsFrom,
    dndItemsTo,
    setDndItemsTo,
  } = useDndStore();

  const onDragStart = (e: MouseEvent, card: DndItemDataType) => {
    removeAllSelectionsFromDocument();
    const target = e.target as HTMLDivElement;
    const targetRect = target.getBoundingClientRect();

    setDragStart(true);
    setDragNode(target);
    setDragNodeRect(targetRect);

    const { height, width, x, y } = targetRect;

    const diffPositionCursorAndCardX = e.clientX - x;
    const diffPositionCursorAndCardY = e.clientY - y;
    target.style.position = "fixed";
    target.style.left = e.clientX - diffPositionCursorAndCardX + "px";
    target.style.top = e.clientY - diffPositionCursorAndCardY + "px";
    target.style.pointerEvents = "none";

    document.documentElement.style.cursor = "grabbing";
    // On Drag Move

    const onDragMove = (e: globalThis.MouseEvent) => {
      const isNodeInCurrentContainer =
        fromContainerNode &&
        fromContainerNode.contains(e.target as Node) &&
        e.target !== fromContainerNode;

      if (isNodeInCurrentContainer && dragNodeRect) {
        const target = e.target as HTMLDivElement;
        target.style.transform = `translateX(${dragNodeRect.width}px)`;
        target.style.transition = `${1}s`;
      }
      if (dragNode && isDragStart) {
        dragNode.style.left = e.clientX - diffPositionCursorAndCardX + "px";
        dragNode.style.top = e.clientY - diffPositionCursorAndCardY + "px";
      } else {
        window.removeEventListener("mousemove", onDragMove);
      }
    };

    window.addEventListener("mousemove", onDragMove);

    // /On Drag Move

    // On Drag End

    const onDragEnd = (e: globalThis.MouseEvent) => {
      if (dragNode) {
        dragNode.style.pointerEvents = "";
        setDragStart(false);
        setDragNode(null);
      }
      if (fromContainerNode) {
        console.log(fromContainerNode.contains(e.target as Node));
      }
      document.documentElement.style.cursor = "";
      document.documentElement.style.cursor = "";

      window.removeEventListener("mouseup", onDragEnd);
    };

    window.addEventListener("mouseup", onDragEnd);

    // /On Drag End
  };

  const testEvent = () => {
    console.log(fromContainerNode);
  };

  return (
    <DndContainer items={data} sharedId="testSharedId">
      {data.map((card) => (
        <DndItem card={card}>
          <div key={card.id} draggable="false" className={s.item}>
            <div style={{ pointerEvents: "none" }}>{card.name}</div>
          </div>
        </DndItem>
      ))}
    </DndContainer>
    // <div
    //   ref={setFromContainerNode}
    //   className={clsx(s.itemsTestWrapper, className)}
    // >

    //   <button onClick={testEvent}>testEvent</button>
    //   {dndItemsFrom?.map((card) => (
    //     <div
    //       key={card.id}
    //       draggable="false"
    //       onMouseDown={(e) => onDragStart(e, card)}
    //       onMouseUp={() => {
    //         console.log("onMouseUp");
    //       }}
    //       className={s.item}
    //     >
    //       <div style={{ pointerEvents: "none" }}>{card.name}</div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default ItemsTest;
