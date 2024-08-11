import clsx from "clsx";

import s from "./Category.module.scss";
import { CategoryComponentType } from "./Category.types";
import RemoveCard from "../../Card/RemoveCard";

const Category: CategoryComponentType = (props) => {
  const { className = "", isActive, name, onClick, id } = props;

  return (
    <div onClick={onClick} className={clsx(s.item, { [s.active]: isActive })}>
      {name}
      <RemoveCard className={clsx(s.remove)} variant="category" id={id} />
    </div>
  );
};

export default Category;
