import clsx from "clsx";

import s from "./AddTodoBtn.module.scss";
import type { AddTodoBtnComponentType } from "./AddTodoBtn.types";
import AddSvg from "@/6Shared/assets/svg/Add.svg";

const AddTodoBtn: AddTodoBtnComponentType = () => {
  return (
    <div className={s.addWrapper}>
      <AddSvg className={s.addSvg} />
    </div>
  );
};

export default AddTodoBtn;
