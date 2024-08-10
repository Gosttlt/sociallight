import clsx from "clsx";

import s from "./Category.module.scss";
import { CategoryComponentType } from "./Category.types";
import useApi from "../api/mutation";

const Category: CategoryComponentType = (props) => {
  const { className = "", isActive, name, onClick } = props;

  return (
    <div onClick={onClick} className={clsx(s.item, { [s.active]: isActive })}>
      {name}
    </div>
  );
};

export default Category;
