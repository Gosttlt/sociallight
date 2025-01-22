import type { FC, ReactNode, SVGProps } from "react";

export type SidebarComponentType = FC<SidebarProps>;
export type MenuItem = {
  name: string;
  isActive: boolean;
  Svg: FC<SVGProps<SVGElement>>;
};
export type SidebarProps = {
  children?: ReactNode;
  className?: string;
  menuItems: MenuItem[];
};
