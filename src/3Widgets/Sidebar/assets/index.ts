import { SidebarMenuItemMenuType } from "../ui/Sidebar.types";
import Task from "@/6Shared/assets/svg/Task.svg";
import Calendar from "@/6Shared/assets/svg/Calendar.svg";

export const sidebarMenuItems: SidebarMenuItemMenuType[] = [
  {
    id: 1,
    name: "Избранное",
    isActive: true,
    subMenu: [
      {
        id: 1,
        name: "Задачи",
        Svg: Task,
        isActive: true,
      },
      {
        id: 2,
        name: "Календарь",
        Svg: Calendar,
        isActive: false,
      },
      {
        id: 3,
        name: "Блакнот",
        Svg: Calendar,
        isActive: false,
      },
    ],
  },
  {
    id: 2,
    name: "Разработка",
    isActive: false,
    subMenu: [
      {
        id: 1,
        name: "Задачи",
        Svg: Task,
        isActive: false,
      },
      {
        id: 2,
        name: "Календарь",
        Svg: Calendar,
        isActive: false,
      },
      {
        id: 3,
        name: "Блакнот",
        Svg: Calendar,
        isActive: false,
      },
    ],
  },
  {
    id: 3,
    name: "Прочее",
    isActive: false,
    subMenu: [
      {
        id: 1,
        name: "Задачи",
        Svg: Task,
        isActive: false,
      },
      {
        id: 2,
        name: "Календарь",
        Svg: Calendar,
        isActive: false,
      },
      {
        id: 3,
        name: "Блакнот",
        Svg: Calendar,
        isActive: false,
      },
    ],
  },
];
