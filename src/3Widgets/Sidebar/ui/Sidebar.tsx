"use client";

import clsx from "clsx";
import s from "./Sidebar.module.scss";
import type { SidebarComponentType } from "./Sidebar.types";
import Collapse from "@/6Shared/uikit/Collapse/Collapse";
import { useState } from "react";

import MainMenuItem from "./MainMenuItem/MainMenuItem";
const Sidebar: SidebarComponentType = ({ menuItems }) => {
  const [menuItemsState, setMenuItemsState] = useState(menuItems);
  const [activeMenu, setActiveMenu] = useState({
    mainMenuItemId: 1,
    subMenuItemId: 1,
  });

  const onActiveCallaps = (id: number) => {
    setMenuItemsState(
      menuItemsState.map((menuItem) => {
        if (menuItem.id === id) {
          return { ...menuItem, isActive: !menuItem.isActive };
        }
        return menuItem;
      })
    );
  };

  return (
    <nav className={s.nav}>
      {menuItemsState.map(({ id, name, subMenu, isActive }, index) => {
        return (
          <>
            <ul key={id}>
              <MainMenuItem
                isOpenCollapse={isActive}
                text={name}
                onClick={() => {
                  onActiveCallaps(id);
                }}
              />
              <Collapse isOpen={isActive} isBlock>
                <ul className={clsx(s.sidebarWrapper)}>
                  {subMenu.map(({ Svg, id: subMenuItemId, name }) => (
                    <li
                      onClick={() => {
                        setActiveMenu({ mainMenuItemId: id, subMenuItemId });
                      }}
                      key={id}
                      className={clsx(s.sideBarItem, {
                        [s.activeMenuItem]:
                          activeMenu.mainMenuItemId === id &&
                          activeMenu.subMenuItemId === subMenuItemId,
                      })}
                    >
                      <Svg className={s.taskSvg} />
                      <div className={s.text}>{name}</div>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </ul>
            {index !== menuItems.length - 1 && <hr className={s.hr} />}
          </>
        );
      })}
    </nav>
  );
};

export default Sidebar;
