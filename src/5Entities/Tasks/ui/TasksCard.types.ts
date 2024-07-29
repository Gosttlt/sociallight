import type { FC, ReactNode } from "react";

export type TasksCardComponentType = FC<TasksCardProps>;

export type TasksCardProps = {
  children: string | ReactNode;
  className?: string;
  EditTaskBtn: ReactNode;
  levelSelectors: [{ text: string; Selector: FC }];
};
