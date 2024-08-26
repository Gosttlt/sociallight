import { DndDirectionType } from "../ui/Dnd.types";
import { DndItemDataType } from "../ui/DndItem/DndItem.types";

type StyleType = "default" | "stretch" | "hidden";
export type DndStylePadding =
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom";
export const getStyleDnd = ({
  node,
  type,
  paddingDirection,
  direction,
}: {
  node: HTMLDivElement;
  type: StyleType;
  paddingDirection?: DndStylePadding;
  direction?: DndDirectionType;
}) => {
  if (type === "default" && direction) {
    if (direction.name === "height") {
      node.style.padding = `${direction.paddingDefolt}px 0px`;
    } else {
      node.style.padding = `0px ${direction.paddingDefolt}px`;
    }
    node.style[direction.name] = `${direction.value}px`;
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "stretch" && paddingDirection && direction) {
    if (direction.name === "height") {
      node.style.padding = `${direction.paddingDefolt}px 0px`;
    } else {
      node.style.padding = `0px ${direction.paddingDefolt}px`;
    }
    node.style[paddingDirection] = `${direction.paddingStreach}px`;
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "hidden" && direction) {
    node.style[direction.name] = `0`;
    node.style.transform = "scale(0)";
    node.style.opacity = "0";
  }
};

export const sortDndFn = (a: DndItemDataType, b: DndItemDataType) =>
  a.order - b.order;
