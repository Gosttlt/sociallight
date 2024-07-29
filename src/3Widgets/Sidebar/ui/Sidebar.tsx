"use client";

import clsx from "clsx";
import s from "./Sidebar.module.scss";
import type { SidebarComponentType } from "./Sidebar.types";
import Task from "@/6Shared/assets/svg/Task.svg";
import Calendar from "@/6Shared/assets/svg/Calendar.svg";

const Sidebar: SidebarComponentType = () => {
  return (
    <div className={clsx(s.sidebarWrapper)}>
      <div className={s.sideBarItem}>
        <Task className={s.taskSvg} />
        <div className={s.text}>Задачи</div>
      </div>
      <div className={s.sideBarItem}>
        <Calendar className={s.calendarSvg} />
        <div className={s.text}>Календарь</div>
      </div>
      <div className={s.sideBarItem}>
        <Calendar className={s.calendarSvg} />
        <div className={s.text}>Блакнот</div>
      </div>
    </div>
  );
};

export default Sidebar;
