import { TaskVariantType } from "@/6Shared/api/types/Task";
import type { FC } from "react";

export type RemoveCardComponentType = FC<RemoveCardPropsType>;

export type RemoveCardPropsType = {
  id: string;
  variant: TaskVariantType;
};
