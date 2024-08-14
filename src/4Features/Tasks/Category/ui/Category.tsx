import clsx from "clsx";

import s from "./Category.module.scss";
import { CategoryComponentType, CategoryProps } from "./Category.types";
import RemoveCard from "../../Card/RemoveCard";
import { forwardRef } from "react";

const Category = forwardRef<HTMLDivElement, CategoryProps>((props, ref) => {
  const {
    className = "",
    isActive,
    name,
    onClick,
    id,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
  } = props;

  return (
    <div
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDrop={onDrop}
      draggable
      ref={ref}
      onClick={onClick}
      className={clsx(s.item, { [s.active]: isActive }, className)}
    >
      {name}
      <RemoveCard className={clsx(s.remove)} variant="category" id={id} />
    </div>
  );
});

Category.displayName = "Category";

export default Category;
