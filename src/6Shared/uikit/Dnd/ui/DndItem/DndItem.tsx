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
  } = props;

  return (
    <div
      onDragStart={(e) => onDragStart?.(e, data)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop?.(e, data)}
      className={clsx(s.dndItem)}
      draggable
    >
      <div className={clsx({ [s.noEvent]: isDragging })}>{children}</div>
    </div>
  );
};

export default DndItem;
