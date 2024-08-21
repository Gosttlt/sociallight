import type { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { DndItemDataType, DndItemProps } from "./DndItem/DndItem.types";

export type DndComponentType = FC<DndProps>;

type DirectionType = "width" | "height";
export type DndDirectionType = { name: DirectionType; value: number };

export type DndProps = {
  children?: ReactElement<DndItemProps>[];
  className?: string;
  direction: DndDirectionType;
  items: DndItemDataType[] | any;
  setData: Dispatch<SetStateAction<any>> | any;
};
