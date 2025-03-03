import {SidebarMenuItemMenuType} from '../ui/Sidebar.types'
import Task from '@public/assets/svg/Task.svg'
import Calendar from '@public/assets/svg/Calendar.svg'

export const sidebarMenuItems: SidebarMenuItemMenuType[] = [
  {
    id: 1,
    name: 'Избранное',
    isActive: true,
    subMenu: [
      {
        id: 1,
        name: 'Задачи',
        Svg: Task,
      },
      {
        id: 2,
        name: 'Календарь',
        Svg: Calendar,
      },
      {
        id: 3,
        name: 'Блакнот',
        Svg: Calendar,
      },
    ],
  },
  {
    id: 2,
    name: 'Разработка',
    isActive: false,
    subMenu: [
      {
        id: 4,
        name: 'Задачи',
        Svg: Task,
      },
      {
        id: 5,
        name: 'Календарь',
        Svg: Calendar,
      },
      {
        id: 6,
        name: 'Блакнот',
        Svg: Calendar,
      },
    ],
  },
  {
    id: 3,
    name: 'Прочее',
    isActive: false,
    subMenu: [
      {
        id: 7,
        name: 'Задачи',
        Svg: Task,
      },
      {
        id: 8,
        name: 'Календарь',
        Svg: Calendar,
      },
      {
        id: 9,
        name: 'Блакнот',
        Svg: Calendar,
      },
    ],
  },
]
