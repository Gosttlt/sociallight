import { MutableRefObject, useEffect, useRef } from "react";

const useAnimationFrame = <T,>() => {
  const refAnimateId = useRef<null | number>(null);
  const refStartValueThisNode = useRef<number>(0);
  const refAdditionalDuration = useRef<number>(0);

  const returnCb = (cb: Function, duration: number, options?: T) => {
    let lastId: number | null = null;
    let wasLastCall: boolean = false;
    let isFirstCall: boolean = true;
    let timeStart: null | number = null;
    const animate = (timestamp: number) => {
      if (lastId === null) lastId = refAnimateId.current;
      if (timeStart === null) timeStart = timestamp;

      const progress = timestamp - timeStart;
      let timeStopCalling = duration - refAdditionalDuration.current;
      if (progress <= timeStopCalling && refAnimateId.current === lastId) {
        cb(progress, duration, {
          ...options,
          isFirstCall,
          refStartValueThisNode,
          refAdditionalDuration,
        });
        if (isFirstCall) {
          isFirstCall = false;
        }
        requestAnimationFrame(animate);
      } else if (
        progress > timeStopCalling &&
        refAnimateId.current === lastId &&
        !wasLastCall
      ) {
        cb(timeStopCalling, duration, {
          ...options,
          isFirstCall,
          refStartValueThisNode,
          refAdditionalDuration,
        });
        wasLastCall = true;
      }
    };

    refAnimateId.current = requestAnimationFrame(animate);
    refStartValueThisNode.current = 0;
    refAdditionalDuration.current = 0;
  };
  return returnCb;
};
export default useAnimationFrame;
