import { TasksCategoryType } from "@/6Shared/api/types/TaskCategory";
import type { FC } from "react";

export type CatigoriesComponentType = FC<CatigoriesPropsType>;
export type CatigoriesPropsType = {
  activeId: string | null;
  onChangeActiveId: (id: string) => void;
};
