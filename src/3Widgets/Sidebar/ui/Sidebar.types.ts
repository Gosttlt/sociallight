import type { FC, ReactNode, SVGProps } from "react";

export type SidebarComponentType = FC<SidebarProps>;

export type SubSidebarMenuItemType = {
  id: number;
  name: string;
  Svg: FC<SVGProps<SVGElement>>;
  isActive: boolean;
};

export type SidebarMenuItemMenuType = {
  id: number;
  name: string;
  isActive: boolean;
  subMenu: SubSidebarMenuItemType[];
};

export type SidebarProps = {
  children?: ReactNode;
  className?: string;
  menuItems: SidebarMenuItemMenuType[];
};
