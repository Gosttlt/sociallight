"use client";
import clsx from "clsx";

import s from "./DndItem.module.scss";
import { DndItemComponentType, DndItemDataType } from "./DndItem.types";
import { DndContext } from "@/1Config/Providers/Dnd";
import { useContext, useEffect, useRef } from "react";
import { unmountComponentAtNode } from "react-dom";

const getStyleFromWrapper = ({
  data,
  fromCard,
  isNextPosition,
  overCard,
  isTargetContainer,
  backStyle,
  frontStyle,
  isDragStart,
  isTransition,
}: {
  overCard?: DndItemDataType | null;
  data: DndItemDataType;
  fromCard: DndItemDataType;
  isNextPosition: boolean | null;
  isTargetContainer?: boolean | null;
  backStyle: string;
  frontStyle: string;
  isDragStart: boolean;
  isTransition: boolean;
}) => {
  let style = {};
  const backStyleObj = {
    transform: backStyle,
    background: "red",
    transition: "1s",
  };
  const frontStyleObj = {
    transform: frontStyle,
    background: "red",
    transition: "1s",
  };
  // if (fromCard.id === data.id && isDragStart) {
  //   style = { transform: "scale(0)", transition: "0.3s" };
  // }

  if (!overCard && data.order > fromCard.order) {
    style = backStyleObj;
  } else if (isTargetContainer && overCard) {
    if (isNextPosition) {
      if (data.order > fromCard.order && data.order <= overCard.order) {
        style = backStyleObj;
      } else if (data.order < fromCard.order && data.order > overCard.order) {
        style = frontStyleObj;
      }
    } else if (isNextPosition === false) {
      if (data.order > fromCard.order && data.order < overCard.order) {
        style = backStyleObj;
      } else if (data.order < fromCard.order && data.order >= overCard.order) {
        style = frontStyleObj;
      }
    }
  }

  return style;
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
    className = "",
    children,
    direction,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDrop,
    data,
    sharedClass = s.dndDefaultClass,
    isTargetContainer,
    wrapperId,
    overCard,
    reverse,
  } = props;
  const {
    isDragStart,
    fromCard,
    isNextPosition,
    fromSharedClass,
    fromWrapperId,
    fromCardNodeRect,
    isTransition,
  } = useContext(DndContext);
  let style = {};

  const isFromSharedClass =
    fromCard &&
    fromCard.id !== data.id &&
    sharedClass === fromSharedClass.current &&
    fromWrapperId.current === wrapperId;

  const isToSharedClass =
    fromWrapperId.current !== wrapperId && overCard && isTargetContainer;
  const backStyle =
    direction && direction.name === "height"
      ? `translateY(-${fromCardNodeRect.current?.height}px)`
      : `translateX(-${fromCardNodeRect.current?.width}px)`;
  const frontStyle =
    direction?.name === "height"
      ? `translateY(${fromCardNodeRect.current?.height}px)`
      : `translateX(${fromCardNodeRect.current?.width}px)`;

  if (reverse) {
    if (isFromSharedClass) {
      style = getStyleYFromReverseWrapper({
        data,
        fromCard,
        isNextPosition,
        overCard,
        isTargetContainer,
        frontStyle,
        backStyle,
      });
    }
    if (isToSharedClass) {
      style = getStyleYToReverseWrapper({
        data,
        isNextPosition,
        overCard,
        frontStyle,
      });
    }
  } else {
    if (isFromSharedClass) {
      style = getStyleFromWrapper({
        data,
        fromCard,
        isNextPosition,
        overCard,
        isTargetContainer,
        backStyle,
        frontStyle,
        isDragStart,
        isTransition,
      });
    }
    if (isToSharedClass) {
      style = getStyleToWrapper({
        data,
        isNextPosition,
        overCard,
        frontStyle,
      });
    }
  }
  console.log(isDragStart);
  return (
    <div
      // ref={ref}
      onDragStart={(e) => onDragStart?.(e, data)}
      onDragOver={(e) => onDragOver?.(e, data)}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop?.(e, data)}
      className={clsx(s.dndItem, sharedClass)}
      draggable
      style={{
        ...style,
      }}
    >
      <div className={clsx({ [s.noEvent]: isTargetContainer }, s.child)}>
        {children}
      </div>
    </div>
  );
};

export default DndItem;
