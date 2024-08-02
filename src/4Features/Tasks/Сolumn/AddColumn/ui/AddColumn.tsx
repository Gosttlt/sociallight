import clsx from "clsx";

import s from "./AddColumn.module.scss";
import type { AddColumnComponentType } from "./AddColumn.types";
import AddSvg from "@/6Shared/assets/svg/Add.svg";

const AddColumn: AddColumnComponentType = (props) => {
  const { className = "", children } = props;

  return <AddSvg className={s.addSvg} />;
};

export default AddColumn;
