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
  direction,
}: {
  overCard?: DndItemDataType | null;
  data: DndItemDataType;
  fromCard: DndItemDataType;
  isNextPosition: boolean | null;
  isTargetContainer?: boolean | null;
  direction: "width" | "height";
}) => {
  let style = {};
  const back = direction === "height" ? s.tansformTop : s.tansformLeft;
  const front = direction === "height" ? s.tansformBottom : s.tansformRight;
  if (!overCard) {
    style = { [back]: data.order > fromCard.order };
  } else if (isTargetContainer && overCard) {
    if (isNextPosition) {
      if (data.order > fromCard.order && data.order <= overCard.order) {
        style = { [back]: true };
      } else if (data.order < fromCard.order && data.order > overCard.order) {
        style = {
          [front]: true,
        };
      }
    } else if (isNextPosition === false) {
      if (data.order > fromCard.order && data.order < overCard.order) {
        style = { [back]: true };
      } else if (data.order < fromCard.order && data.order >= overCard.order) {
        style = {
          [front]: true,
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
  direction,
}: {
  isNextPosition: boolean | null;
  data: DndItemDataType;
  overCard: DndItemDataType;
  direction: "width" | "height";
}) => {
  let style = {};
  const front = direction === "height" ? s.tansformBottom : s.tansformRight;
  if (isNextPosition) {
    if (data.order > overCard.order) {
      style = { [front]: true };
    }
  } else if (isNextPosition === false) {
    if (data.order >= overCard.order) {
      style = { [front]: true };
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
// if (direction?.name === "width") {
//   if ( fromCard && fromCard.id !== data.id) {
//     if (!overCard) {
//       style = { [s.tansformLeft]: data.order > fromCard.order };
//     } else if (overCard) {
//       if (isNextPosition) {
//         if (data.order > fromCard.order) {
//           style = { [s.tansformLeft]: data.order <= overCard.order };
//         } else {
//           style = {
//             [s.tansformRight]: data.order > overCard.order,
//           };
//         }
//       } else {
//         if (data.order > fromCard.order) {
//           style = { [s.tansformLeft]: data.order < overCard.order };
//         } else {
//           style = {
//             [s.tansformRight]: data.order >= overCard.order,
//           };
//         }
//       }
//     }
//   }
// }

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
        direction: direction!.name,
      });
    }
    if (isToSharedClass) {
      style = getStyleToWrapper({
        data,
        isNextPosition,
        overCard,
        direction: direction!.name,
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
      draggable
    >
      <div className={clsx({ [s.noEvent]: isTargetContainer }, s.child)}>
        {children}
      </div>
    </div>
  );
};

export default DndItem;
