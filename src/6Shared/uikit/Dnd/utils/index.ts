import { DirectionType } from "../ui/Dnd.types";
import { DndItemDataType } from "../ui/DndItem/DndItem.types";

type StyleType = "default" | "stretch" | "hidden";
export const getStyleDnd = ({
  node,
  type,
  paddingDirection,
  direction,
}: {
  node: HTMLDivElement;
  type: StyleType;
  paddingDirection?: "paddingLeft" | "paddingRight";
  direction?: { name: DirectionType; value?: number };
}) => {
  if (type === "default" && direction) {
    node.style.padding = "0px 10px";
    node.style[direction.name] = `${direction.value}px`;
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "stretch" && paddingDirection) {
    node.style.padding = "0px 10px";
    node.style[paddingDirection] = "50px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "hidden") {
    node.style.padding = "0";
    node.style.width = "0";
    node.style.transform = "scale(0)";
    node.style.opacity = "0";
  }
};

export const sortDndFn = (a: DndItemDataType, b: DndItemDataType) =>
  a.order - b.order;
