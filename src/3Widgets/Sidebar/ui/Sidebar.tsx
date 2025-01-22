"use client";

import clsx from "clsx";
import s from "./Sidebar.module.scss";
import type { SidebarComponentType } from "./Sidebar.types";

const Sidebar: SidebarComponentType = ({ menuItems }) => {
  return (
    <nav>
      <div className={s.mainMenuItem}>Избранное</div>
      <ul className={clsx(s.sidebarWrapper)}>
        {menuItems.map(({ isActive, name, Svg }) => (
          <li className={clsx(s.sideBarItem, { [s.activeMenuItem]: isActive })}>
            <Svg className={s.taskSvg} />
            <div className={s.text}>{name}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
