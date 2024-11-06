import { MutableRefObject } from "react";

export const dndAppearance = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    const result = Math.sqrt(progress / 1000 / (duration / 1000));
    if (result > 0.8) {
      ref.current.style.transform = `scale(1)`;
    } else {
      ref.current.style.transform = `scale(${result})`;
    }
  }
};
export const dndDisappearance = (
  progress: number,
  duration: number,
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  if (ref.current) {
    const result = Math.pow(1 - progress / 1000 / (duration / 1000), 4);
    console.log(result);
    if (result < 0.2) {
      ref.current.style.transform = `scale(${0})`;
    } else {
      ref.current.style.transform = `scale(${result})`;
    }
  }
};
