import type { FC, ReactNode } from "react";

export type TaskCardComponentType = FC<TaskCardProps>;

export type TaskCardProps = {
  children: string | ReactNode;
  className?: string;
  EditTaskBtn: ReactNode;
  levelSelectors: [{ text: string; Selector: FC }];
  isCreate: boolean;
};
