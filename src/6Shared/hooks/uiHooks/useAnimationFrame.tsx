import { MutableRefObject, useEffect, useRef } from "react";

// const useAnimationFrame = (ref: MutableRefObject<HTMLElement | null>) => {
const useAnimationFrame = <T,>() => {
  const refTimeStart = useRef<null | number>(null);
  const refAnimateId = useRef<null | number>(null);

  const returnCb = (cb: Function, duration: number, options?: T) => {
    let lastId: number | null = null;
    let isLastCall: boolean = false;

    const animate = (timestamp: number) => {
      if (lastId === null) lastId = refAnimateId.current;
      if (refTimeStart.current === null) refTimeStart.current = timestamp;

      const progress = timestamp - refTimeStart.current;
      if (progress <= duration && refAnimateId.current === lastId) {
        cb(progress, duration, options);
        requestAnimationFrame(animate);
      } else if (
        progress > duration &&
        refAnimateId.current === lastId &&
        !isLastCall
      ) {
        isLastCall = true;
        cb(duration, duration, options);
      }
    };

    refAnimateId.current = requestAnimationFrame(animate);
    refTimeStart.current = null;
  };
  return returnCb;
};
export default useAnimationFrame;
