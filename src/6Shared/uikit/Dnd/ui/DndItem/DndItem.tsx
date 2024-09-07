import clsx from "clsx";

import s from "./DndItem.module.scss";
import { DndItemComponentType, DndItemDataType } from "./DndItem.types";
import { DndContext } from "@/1Config/Providers/Dnd";
import { useContext } from "react";

const getStyleFromWrapper = ({
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

  if (!overCard) {
    style = { [backStyle]: data.order > fromCard.order };
  } else if (isTargetContainer && overCard) {
    if (isNextPosition) {
      if (data.order > fromCard.order && data.order <= overCard.order) {
        style = { [backStyle]: true };
      } else if (data.order < fromCard.order && data.order > overCard.order) {
        style = {
          [frontStyle]: true,
        };
      }
    } else if (isNextPosition === false) {
      if (data.order > fromCard.order && data.order < overCard.order) {
        style = { [backStyle]: true };
      } else if (data.order < fromCard.order && data.order >= overCard.order) {
        style = {
          [frontStyle]: true,
        };
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
      style = { [frontStyle]: true };
    }
  } else if (isNextPosition === false) {
    if (data.order >= overCard.order) {
      style = { [frontStyle]: true };
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
}: {
  overCard?: DndItemDataType | null;
  data: DndItemDataType;
  fromCard: DndItemDataType;
  isNextPosition: boolean | null;
  isTargetContainer?: boolean | null;
}) => {
  let style = {};
  if (!overCard) {
    style = { [s.tansformTop]: data.order < fromCard.order };
  } else if (isTargetContainer && overCard) {
    if (isNextPosition) {
      if (data.order < fromCard.order && data.order >= overCard.order) {
        style = { [s.tansformTop]: true };
      } else if (data.order > fromCard.order && data.order < overCard.order) {
        style = {
          [s.tansformBottom]: true,
        };
      }
    } else if (isNextPosition === false) {
      if (data.order < fromCard.order && data.order > overCard.order) {
        style = { [s.tansformTop]: true };
      } else if (data.order > fromCard.order && data.order <= overCard.order) {
        style = {
          [s.tansformBottom]: true,
        };
      }
    }
  }
  return style;
};

const getStyleYToReverseWrapper = ({
  data,
  isNextPosition,
  overCard,
}: {
  isNextPosition: boolean | null;
  data: DndItemDataType;
  overCard: DndItemDataType;
}) => {
  let style = {};
  if (isNextPosition) {
    if (data.order < overCard.order) {
      style = { [s.tansformBottom]: true };
    }
  } else if (isNextPosition === false) {
    if (data.order <= overCard.order) {
      style = { [s.tansformBottom]: true };
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
    transition,
  } = props;

  const { fromCard, isNextPosition, fromSharedClass, fromWrapperId } =
    useContext(DndContext);
  let style = {};

  const isFromSharedClass =
    fromCard &&
    fromCard.id !== data.id &&
    sharedClass === fromSharedClass.current &&
    fromWrapperId.current === wrapperId;

  const isToSharedClass =
    fromWrapperId.current !== wrapperId && overCard && isTargetContainer;

  const backStyle =
    direction?.name === "height" ? s.tansformTop : s.tansformLeft;
  const frontStyle =
    direction?.name === "height" ? s.tansformBottom : s.tansformRight;

  if (reverse) {
    if (isFromSharedClass) {
      style = getStyleYFromReverseWrapper({
        data,
        fromCard,
        isNextPosition,
        overCard,
        isTargetContainer,
      });
    }
    if (isToSharedClass) {
      style = getStyleYToReverseWrapper({ data, isNextPosition, overCard });
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

  return (
    <div
      onDragStart={(e) => onDragStart?.(e, data)}
      onDragOver={(e) => onDragOver?.(e, data)}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop?.(e, data)}
      className={clsx(s.dndItem, sharedClass, style)}
      id={`order` + data.order}
      style={{
        transition: !transition ? "none" : "0.3s",
      }}
      draggable
    >
      <div className={clsx({ [s.noEvent]: isTargetContainer }, s.child)}>
        {children}
      </div>
    </div>
  );
};

export default DndItem;
