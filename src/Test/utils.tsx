import { isArray } from "@apollo/client/utilities";
import { MutableRefObject } from "react";

export const getTransformValueArr = (el: HTMLDivElement) => {
  const trans = el.style.transform;
  let values = trans.match(/-?\d+\.?\d*/g);
  if (values) return values;
  return ["1", "0", "0", "1", "0", "0"];
};

export type SetScaleType = {
  refThisNode: MutableRefObject<HTMLDivElement | null>;
  direction: "appearance" | "disappearance";
};

export const setScale = (
  progress: number,
  duration: number,
  { refThisNode, direction }: SetScaleType
) => {
  if (refThisNode.current) {
    let result = progress / duration;
    if (direction === "disappearance") result = 1 - result;
    const curValue = getTransformValueArr(refThisNode.current);
    if (Array.isArray(curValue)) {
      curValue[0] = String(result);
      curValue[3] = String(result);
    }
    refThisNode.current.style.transform = `matrix(${curValue})`;
  }
};

type XDirectionTypes = "left" | "reverseLeft" | "right" | "reverseRight";
type YDirectionTypes = "top" | "reverseTop" | "bot" | "reverseBot";

type DirectionsType = XDirectionTypes | YDirectionTypes;

export type СbTransformItemArgsType = {
  refDragNodeRect: MutableRefObject<DOMRect | null>;
  thisNode: HTMLDivElement;
  direction: DirectionsType;
};
const getDurationCoefficientDecriment = (
  progress: number,
  duration: number
) => {
  return 1 - progress / duration;
};
const getDurationCoefficientIncrement = (
  progress: number,
  duration: number
) => {
  return progress / duration;
};

const getLeftTransformValue = (
  dragElemWidth: number,
  progress: number,
  duration: number,
  refReductionDuration: MutableRefObject<number>,
  startPosition: number
) => {
  refReductionDuration.current =
    (Math.abs(startPosition) / dragElemWidth) * duration;

  let newTransformPosition =
    getDurationCoefficientIncrement(progress, duration) * dragElemWidth -
    startPosition;
  return -newTransformPosition;
};
const getLeftReversTransformValue = (
  dragElemWidth: number,
  progress: number,
  duration: number,
  refReductionDuration: MutableRefObject<number>,
  startPosition: number
) => {
  refReductionDuration.current =
    (1 - Math.abs(startPosition) / dragElemWidth) * duration;

  const newTransformPosition =
    getDurationCoefficientDecriment(progress, duration) * dragElemWidth;

  let additionalTransformCoefficient =
    1 - Math.abs(startPosition) / dragElemWidth;

  let additionalTransformPosition =
    additionalTransformCoefficient * dragElemWidth;

  return -newTransformPosition + additionalTransformPosition;
};
const getRightTransformValue = (
  dragElemWidth: number,
  progress: number,
  duration: number,
  refReductionDuration: MutableRefObject<number>,
  startPosition: number
) => {
  let coefficientCompletedDistance = startPosition / dragElemWidth;
  refReductionDuration.current = coefficientCompletedDistance * duration;

  let newTransformPosition =
    getDurationCoefficientIncrement(progress, duration) * dragElemWidth +
    startPosition;
  return newTransformPosition;
};

const getRightReversTransformValue = (
  dragElemWidth: number,
  progress: number,
  duration: number,
  refReductionDuration: MutableRefObject<number>,
  startPosition: number
) => {
  let coefficientCompletedDistance = 1 - startPosition / dragElemWidth;
  refReductionDuration.current = coefficientCompletedDistance * duration;

  const newTransformPosition =
    getDurationCoefficientDecriment(progress, duration) * dragElemWidth;

  let additionalTransformCoefficient =
    1 - Math.abs(startPosition) / dragElemWidth;

  let additionalTransformPosition =
    additionalTransformCoefficient * dragElemWidth;

  return newTransformPosition - additionalTransformPosition;
};

let xDirectionValues: XDirectionTypes[] = [
  "left",
  "right",
  "reverseLeft",
  "reverseRight",
];
let yDirectionValues: YDirectionTypes[] = [
  "top",
  "bot",
  "reverseTop",
  "reverseBot",
];

type getDragNodeFnType = (dragNodeSizes: DOMRect) => number;

const getDragNodeWidth: getDragNodeFnType = (dragNodeSizes) => {
  return Math.floor(dragNodeSizes.width);
};
const getDragNodeHeight: getDragNodeFnType = (dragNodeSizes) => {
  return Math.floor(dragNodeSizes.height);
};

const directionSetting: Record<DirectionsType, { getTransformValue?: any }> = {
  left: {
    getTransformValue: getLeftTransformValue,
  },
  reverseLeft: {
    getTransformValue: getLeftReversTransformValue,
  },
  right: {
    getTransformValue: getRightTransformValue,
  },
  reverseRight: {
    getTransformValue: getRightReversTransformValue,
  },
  top: {
    getTransformValue: getLeftTransformValue,
  },
  reverseTop: {
    getTransformValue: getLeftReversTransformValue,
  },
  bot: {
    getTransformValue: getRightTransformValue,
  },
  reverseBot: {
    getTransformValue: getRightReversTransformValue,
  },
};

const getAxis = (direction: DirectionsType): AxisType => {
  return xDirectionValues.includes(direction as XDirectionTypes) ? "x" : "y";
};

type AxisType = "x" | "y";

const axisSetting: Record<
  AxisType,
  { getDragNodeSize: getDragNodeFnType; matrixTranslateNumber: number }
> = {
  x: { getDragNodeSize: getDragNodeWidth, matrixTranslateNumber: 4 },
  y: { getDragNodeSize: getDragNodeHeight, matrixTranslateNumber: 5 },
};

export const setTransform = (
  progress: number,
  duration: number,
  {
    refDragNodeRect,
    thisNode,
    direction,
    isFirstCall,
    refStartPositionThisNode,
    refReductionDuration,
  }: СbTransformItemArgsType & {
    isFirstCall: boolean;
    refStartPositionThisNode: MutableRefObject<number>;
    refReductionDuration: MutableRefObject<number>;
  }
) => {
  if (refDragNodeRect.current && thisNode) {
    let axis = getAxis(direction);
    let result = 0;
    let curMatrixValue = getTransformValueArr(thisNode);
    let floorDragNodeSize = axisSetting[axis].getDragNodeSize(
      refDragNodeRect.current
    );
    if (isFirstCall) {
      if (xDirectionValues.includes(direction as XDirectionTypes)) {
        refStartPositionThisNode.current = Number(curMatrixValue[4]);
      } else if (yDirectionValues.includes(direction as YDirectionTypes)) {
        refStartPositionThisNode.current = Number(curMatrixValue[5]);
      }
    }

    result = directionSetting[direction].getTransformValue(
      floorDragNodeSize,
      progress,
      duration,
      refReductionDuration,
      refStartPositionThisNode.current
    );

    curMatrixValue[axisSetting[axis].matrixTranslateNumber] = result.toFixed(1);
    thisNode.style.transform = `matrix(${curMatrixValue})`;
  }
};
