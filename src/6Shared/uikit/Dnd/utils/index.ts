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

export const getDataCurrentParent = ({
  fromCards,
  dragCard,
}: {
  fromCards: DndItemDataType[];
  dragCard: DndItemDataType;
}) => {
  let filterCards = fromCards.filter((curCard) => dragCard.id !== curCard.id);
  filterCards.push(dragCard);
  const sortCards = filterCards.map((curCard, index) => ({
    ...curCard,
    order: index,
  }));
  return sortCards;
};

export const getDataCurrentCard = ({
  dragCard,
  fromCards,
  isNextPosition,
  lastOverCard,
}: {
  fromCards: DndItemDataType[];
  dragCard: DndItemDataType;
  lastOverCard: DndItemDataType;
  isNextPosition: boolean;
}) => {
  const cardOrder = isNextPosition ? 0.1 : -0.1;

  const newCards = fromCards
    .map((curCard: DndItemDataType) => {
      if (curCard.id === dragCard?.id) {
        return { ...curCard, order: lastOverCard.order + cardOrder };
      }
      return curCard;
    })
    .sort(sortDndFn)
    .map((curCard: { id: string | number; order: number }, i: number) => ({
      ...curCard,
      order: i,
    }));

  return newCards;
};

export const getDataOtherParent = ({
  fromCards,
  toCards,
  dragCard,
  fromParentId,
  toParentId,
}: {
  fromCards: DndItemDataType[];
  toCards: DndItemDataType[];
  dragCard: DndItemDataType;
  fromParentId: string;
  toParentId: string;
}) => {
  const filterFromCards = fromCards
    .filter((curCard) => curCard.id !== dragCard.id)
    .map((curCard, index) => ({ ...curCard, order: index }));

  const sortCards = [...toCards, { ...dragCard, order: toCards.length }];

  return {
    fromCard: filterFromCards,
    toCard: sortCards,
    fromParentId,
    toParentId,
  };
};

export const getDataOtherCard = ({
  dragCard,
  fromCards,
  toCards,
  isNextPosition,
  lastOverCard,
  fromParentId,
  toParentId,
}: {
  fromCards: DndItemDataType[];
  toCards: DndItemDataType[];
  dragCard: DndItemDataType;
  lastOverCard: DndItemDataType;
  isNextPosition: boolean;
  fromParentId: string;
  toParentId: string;
}) => {
  const filterFromCards = fromCards
    .filter((curCard) => curCard.id !== dragCard.id)
    .map((curCard, index) => ({ ...curCard, order: index }));

  const cardOrder = isNextPosition ? 0.1 : -0.1;

  const newDragCard = { ...dragCard, order: lastOverCard.order + cardOrder };

  const newToCards = [...toCards, newDragCard]
    .sort(sortDndFn)
    .map((curCard, index) => ({ ...curCard, order: index }));

  return {
    fromCard: filterFromCards,
    toCard: newToCards,
    fromParentId,
    toParentId,
  };
};
