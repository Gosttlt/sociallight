import type { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { DndItemDataType, DndItemProps } from "./DndItem/DndItem.types";

export type DndComponentType = FC<DndProps>;

export type DirectionType = "width" | "height";

export type DndProps = {
  children?: ReactElement<DndItemProps>[];
  className?: string;
  direction: { name: DirectionType; value: number };
  items: DndItemDataType[] | any;
  setData: Dispatch<SetStateAction<any>> | any;
};
