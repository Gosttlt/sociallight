import { TaskVariantType } from "@/6Shared/api/types/Task";
import type { FC } from "react";

export type InputTaskComponentType = FC<InputTaskProps>;

export type InputTaskProps = {
  value: string;
  id: string;
  isFocus: boolean;
  variant: TaskVariantType;
};
