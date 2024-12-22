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

export type СbTransformItemArgsType = {
  refDragNodeWidth: MutableRefObject<number | null>;
  thisNode: HTMLDivElement;
  direction:
    | "left"
    | "reverseLeft"
    | "right"
    | "reverseRight"
    | "top"
    | "reverseTop"
    | "bot"
    | "reverseBot";
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
  refAdditionalDuration: MutableRefObject<number>,
  startPosition: number
) => {
  refAdditionalDuration.current =
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
  refAdditionalDuration: MutableRefObject<number>,
  startPosition: number
) => {
  refAdditionalDuration.current =
    (1 - Math.abs(startPosition) / dragElemWidth) * duration;

  const newTransformPosition =
    getDurationCoefficientDecriment(progress, duration) * dragElemWidth;

  let additionalTransformCoefficient =
    1 - Math.abs(startPosition) / dragElemWidth;

  let additionalTransformPosition =
    additionalTransformCoefficient * dragElemWidth;

  return -newTransformPosition + additionalTransformPosition;
};

export const cbTransformItem = (
  progress: number,
  duration: number,
  {
    refDragNodeWidth,
    thisNode,
    direction,
    isFirstCall,
    refStartValueThisNode,
    refAdditionalDuration,
  }: СbTransformItemArgsType & {
    isFirstCall: boolean;
    refStartValueThisNode: MutableRefObject<number>;
    refAdditionalDuration: MutableRefObject<number>;
  }
) => {
  if (refDragNodeWidth.current && thisNode) {
    let result = 0;
    let curMatrixValue = getTransformValueArr(thisNode);
    let floorDragNodeWidth = Math.floor(refDragNodeWidth.current);
    if (isFirstCall) {
      refStartValueThisNode.current = Number(curMatrixValue[4]);
    }

    if (direction === "left") {
      result = getLeftTransformValue(
        floorDragNodeWidth,
        progress,
        duration,
        refAdditionalDuration,
        refStartValueThisNode.current
      );
    } else if (direction === "reverseLeft") {
      result = getLeftReversTransformValue(
        floorDragNodeWidth,
        progress,
        duration,
        refAdditionalDuration,
        refStartValueThisNode.current
      );
    } else if (direction === "right") {
      result = (progress / duration) * floorDragNodeWidth;
    } else if (direction === "reverseRight") {
      result = floorDragNodeWidth - (progress / duration) * floorDragNodeWidth;
    }

    curMatrixValue[4] = String(result);
    thisNode.style.transform = `matrix(${curMatrixValue})`;
  }
};
