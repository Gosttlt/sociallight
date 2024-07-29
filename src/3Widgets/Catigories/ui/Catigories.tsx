"use client";
import clsx from "clsx";

import s from "./Catigories.module.scss";
import type { CatigoriesComponentType } from "./Catigories.types";
import AddSvg from "@/6Shared/assets/svg/Add.svg";

const Catigories: CatigoriesComponentType = () => {
  return (
    <div className={clsx(s.catigoriesWrapper)}>
      <div className={clsx(s.item, s.active)}>Работа</div>
      <div className={s.item}>Покупки</div>
      <div className={s.item}>Дом</div>
      <AddSvg className={s.addSvg} />
    </div>
  );
};

export default Catigories;
