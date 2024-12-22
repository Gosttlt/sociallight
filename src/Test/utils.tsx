import { isArray } from "@apollo/client/utilities";
import { MutableRefObject } from "react";

export const getTransformValueArr = (el: HTMLDivElement) => {
  const trans = el.style.transform;
  let values = trans.match(/-?\d+\.?\d*/g);
  if (values) return values;
  return ["1", "0", "0", "1", "0", "0"];
};

export const dndAppearance = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    const result = progress / duration;
    const curValue = getTransformValueArr(ref.current);
    if (Array.isArray(curValue)) {
      curValue[0] = String(result);
      curValue[3] = String(result);
    }
    ref.current.style.transform = `matrix(${curValue})`;
  }
};
export const dndDisappearance = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    const result = 1 - progress / duration;
    const curValue = getTransformValueArr(ref.current);
    if (Array.isArray(curValue)) {
      curValue[0] = String(result);
      curValue[3] = String(result);
    }
    ref.current.style.transform = `matrix(${curValue})`;
  }
};
type XDirectionTypes = "left" | "reverseLeft" | "right" | "reverseRight";
type YDirectionTypes = "top" | "reverseTop" | "bot" | "reverseBot";

type DirectionsType = XDirectionTypes | YDirectionTypes;

export type СbTransformItemArgsType = {
  refDragNode: MutableRefObject<HTMLDivElement | null>;
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

export const cbTransformItem = (
  progress: number,
  duration: number,
  {
    refDragNode,
    thisNode,
    direction,
    isFirstCall,
    refStartValueThisNode,
    refReductionDuration,
  }: СbTransformItemArgsType & {
    isFirstCall: boolean;
    refStartValueThisNode: MutableRefObject<number>;
    refReductionDuration: MutableRefObject<number>;
  }
) => {
  if (refDragNode.current && thisNode) {
    let axis = getAxis(direction);
    let dragNodeSizes = refDragNode.current.getBoundingClientRect();
    let result = 0;
    let curMatrixValue = getTransformValueArr(thisNode);
    let floorDragNodeSize = axisSetting[axis].getDragNodeSize(dragNodeSizes);
    console.log(floorDragNodeSize);
    if (isFirstCall) {
      if (xDirectionValues.includes(direction as XDirectionTypes)) {
        refStartValueThisNode.current = Number(curMatrixValue[4]);
      } else if (yDirectionValues.includes(direction as YDirectionTypes)) {
        refStartValueThisNode.current = Number(curMatrixValue[5]);
      }
    }

    result = directionSetting[direction].getTransformValue(
      floorDragNodeSize,
      progress,
      duration,
      refReductionDuration,
      refStartValueThisNode.current
    );

    curMatrixValue[axisSetting[axis].matrixTranslateNumber] = result.toFixed(1);
    thisNode.style.transform = `matrix(${curMatrixValue})`;
  }
};
