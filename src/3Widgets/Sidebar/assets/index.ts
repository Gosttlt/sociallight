import { MenuItem } from "../ui/Sidebar.types";
import Task from "@/6Shared/assets/svg/Task.svg";
import Calendar from "@/6Shared/assets/svg/Calendar.svg";

export const menuItems: MenuItem[] = [
  {
    name: "Задачи",
    Svg: Task,
    isActive: true,
  },
  {
    name: "Календарь",
    Svg: Calendar,
    isActive: false,
  },
  {
    name: "Блакнот",
    Svg: Calendar,
    isActive: false,
  },
];
