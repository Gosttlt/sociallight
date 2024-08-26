import clsx from "clsx";

import s from "./DndItem.module.scss";
import { DndItemComponentType } from "./DndItem.types";

const DndItem: DndItemComponentType = (props) => {
  const {
    className = "",
    children,
    isDragging,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDrop,
    data,
    direction,
    sharedClass = s.dndDefaultClass,
  } = props;

  return (
    <div
      onDragStart={(e) => onDragStart?.(e, data)}
      onDragOver={onDragOver}
      style={{ [direction!.name]: `${direction!.value}px` }}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop?.(e, data)}
      className={clsx(s.dndItem, sharedClass, {
        [s.dirItemY]: direction?.name === "height",
      })}
      draggable
    >
      <div className={clsx({ [s.noEvent]: isDragging })}>{children}</div>
    </div>
  );
};

export default DndItem;
