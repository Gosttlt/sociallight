"use client";
import clsx from "clsx";

import s from "./DndItem.module.scss";
import { DndItemComponentType, DndItemDataType } from "./DndItem.types";
import { DndContext } from "@/1Config/Providers/Dnd";
import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { setTransform, СbTransformItemArgsType } from "@/Test/utils";
import useAnimationFrame from "@/6Shared/hooks/uiHooks/useAnimationFrame";

const getStyleFromWrapper = ({
  data,
  fromCard,
  isNextPosition,
  overCard,
  isTargetContainer,
  isDragStart,
  rafTransform,
  thisNode,
  fromCardNodeRect,
}: {
  fromCardNodeRect: MutableRefObject<DOMRect | null>;
  thisNode: HTMLDivElement | null;
  rafTransform: any;
  overCard?: DndItemDataType | null;
  data: DndItemDataType;
  fromCard?: DndItemDataType | null;
  isNextPosition: boolean | null;
  isTargetContainer?: boolean | null;
  isDragStart: boolean;
}) => {
  const duration = 300;
  if (fromCard && isDragStart) {
    // Элементы относительно перетаскиваемого
    const isElementBeforeDragCard = data.order < fromCard.order;
    const isElementAfterDragCard = data.order > fromCard.order;

    if (isTargetContainer) {
      if (overCard) {
        // Курсор относительно элемента
        const isCursorBeforeDragCard = data.order < overCard.order;
        const isCursorAfterDragCard = data.order > overCard.order;
        const isCursorEqualDragCard = data.order === overCard.order;

        // Елемент отнасительно курсора
        // isNextPosition
        const isCursorStartPositionFromElement = isNextPosition === false;
        const isCursorEndPositionFromElement = isNextPosition === true;

        if (isElementBeforeDragCard) {
          if (isCursorBeforeDragCard) {
            rafTransform(setTransform, duration, {
              thisNode,
              refDragNodeRect: fromCardNodeRect,
              direction: "reverseRight",
            });
          }
          if (isCursorAfterDragCard) {
            rafTransform(setTransform, duration, {
              thisNode,
              refDragNodeRect: fromCardNodeRect,
              direction: "right",
            });
          }
          if (isCursorEqualDragCard) {
            if (isCursorStartPositionFromElement) {
              rafTransform(setTransform, duration, {
                thisNode,
                refDragNodeRect: fromCardNodeRect,
                direction: "right",
              });
            }
            if (isCursorEndPositionFromElement) {
              rafTransform(setTransform, duration, {
                thisNode,
                refDragNodeRect: fromCardNodeRect,
                direction: "reverseRight",
              });
            }
          }
        }
        if (isElementAfterDragCard) {
          if (isCursorBeforeDragCard) {
            rafTransform(setTransform, duration, {
              thisNode,
              refDragNodeRect: fromCardNodeRect,
              direction: "left",
            });
          }
          if (isCursorAfterDragCard) {
            rafTransform(setTransform, duration, {
              thisNode,
              refDragNodeRect: fromCardNodeRect,
              direction: "reverseLeft",
            });
          }
          if (isCursorEqualDragCard) {
            if (isCursorStartPositionFromElement) {
              rafTransform(setTransform, duration, {
                thisNode,
                refDragNodeRect: fromCardNodeRect,
                direction: "reverseLeft",
              });
            }
            if (isCursorEndPositionFromElement) {
              rafTransform(setTransform, duration, {
                thisNode,
                refDragNodeRect: fromCardNodeRect,
                direction: "left",
              });
            }
          }
        }
      }
    } else {
      if (isElementAfterDragCard) {
        rafTransform(setTransform, duration, {
          thisNode,
          refDragNodeRect: fromCardNodeRect,
          direction: "left",
        });
      } else if (isElementBeforeDragCard) {
        rafTransform(setTransform, duration, {
          thisNode,
          refDragNodeRect: fromCardNodeRect,
          direction: "reverseRight",
        });
      }
    }
  }
};

const getStyleToWrapper = ({
  data,
  isNextPosition,
  overCard,
  frontStyle,
}: {
  isNextPosition: boolean | null;
  data: DndItemDataType;
  overCard: DndItemDataType;
  frontStyle: string;
}) => {
  let style = {};

  if (isNextPosition) {
    if (data.order > overCard.order) {
      style = {
        transform: frontStyle,
      };
    }
  } else if (isNextPosition === false) {
    if (data.order >= overCard.order) {
      style = {
        transform: frontStyle,
      };
    }
  }
  return style;
};

const getStyleYFromReverseWrapper = ({
  data,
  fromCard,
  isNextPosition,
  overCard,
  isTargetContainer,
  backStyle,
  frontStyle,
}: {
  overCard?: DndItemDataType | null;
  data: DndItemDataType;
  fromCard: DndItemDataType;
  isNextPosition: boolean | null;
  isTargetContainer?: boolean | null;
  backStyle: string;
  frontStyle: string;
}) => {
  let style = {};
  if (!overCard && data.order < fromCard.order) {
    style = { transform: backStyle };
  } else if (isTargetContainer && overCard) {
    if (isNextPosition) {
      if (data.order < fromCard.order && data.order >= overCard.order) {
        style = { transform: backStyle };
      } else if (data.order > fromCard.order && data.order < overCard.order) {
        style = { transform: frontStyle };
      }
    } else if (isNextPosition === false) {
      if (data.order < fromCard.order && data.order > overCard.order) {
        style = { transform: backStyle };
      } else if (data.order > fromCard.order && data.order <= overCard.order) {
        style = { transform: frontStyle };
      }
    }
  }
  return style;
};

const getStyleYToReverseWrapper = ({
  data,
  isNextPosition,
  overCard,
  frontStyle,
}: {
  isNextPosition: boolean | null;
  data: DndItemDataType;
  overCard: DndItemDataType;
  frontStyle: string;
}) => {
  let style = {};
  if (isNextPosition) {
    if (data.order < overCard.order) {
      style = {
        transform: frontStyle,
      };
    }
  } else if (isNextPosition === false) {
    if (data.order <= overCard.order) {
      style = {
        transform: frontStyle,
      };
    }
  }
  return style;
};

const DndItem: DndItemComponentType = (props) => {
  const {
    children,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDrop,
    data,
    sharedClass = s.dndDefaultClass,
    isTargetContainer,
    overCard,
    refLastOverCardForItem,
  } = props;
  const { isDragStart, fromCard, isNextPosition, fromCardNodeRect } =
    useContext(DndContext);
  const rafTransform = useAnimationFrame<СbTransformItemArgsType>();
  const refThisNode = useRef<HTMLDivElement | null>(null);

  getStyleFromWrapper({
    fromCardNodeRect,
    thisNode: refThisNode.current,
    rafTransform,
    data,
    fromCard,
    isNextPosition,
    overCard,
    isTargetContainer,
    isDragStart,
  });
  // if (overCard && data.order > overCard.order) {
  //   rafTransform(setTransform, 500, {
  //     thisNode: refThisNode.current!,
  //     refDragNodeRect: fromCardNodeRect,
  //     direction: "right",
  //   });
  // }

  return (
    <div
      ref={refThisNode}
      onDragStart={(e) => onDragStart?.(e, data)}
      onDragOver={(e) => onDragOver?.(e, data)}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop?.(e, data)}
      className={clsx(s.dndItem, sharedClass)}
      draggable
    >
      <div className={clsx({ [s.noEvent]: isTargetContainer }, s.child)}>
        {children}
      </div>
    </div>
  );
};

export default DndItem;
