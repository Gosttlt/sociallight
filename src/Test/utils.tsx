import { MutableRefObject } from "react";

export const dndAppearance = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    const result = progress / duration;
    ref.current.style.transform = `scale(${result})`;
  }
};
export const dndDisappearance = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    const result = 1 - progress / duration;
    ref.current.style.transform = `scale(${result})`;
  }
};

export const dndTransformLeft = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    // const result = Math.pow(1 - progress / 1000 / (duration / 1000), 4);
    // if (result < 0.2) {
    //   ref.current.style.transform = `scale(${0})`;
    // } else {
    //   ref.current.style.transform = `scale(${result})`;
    // }
    console.log(progress, duration, ref);
  }
};
