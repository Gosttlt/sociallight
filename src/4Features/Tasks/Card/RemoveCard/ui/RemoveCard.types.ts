import type { FC } from "react";

export type RemoveCardComponentType = FC<RemoveCardPropsType>;
export type TaskVariantType = "task" | "column";
export type RemoveCardPropsType = {
  id: string;
  variant: TaskVariantType;
};
