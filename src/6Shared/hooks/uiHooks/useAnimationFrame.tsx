import { MutableRefObject, useEffect, useRef } from "react";

const useAnimationFrame = <T,>() => {
  const refAnimateId = useRef<null | number>(null);
  const refStartPositionThisNode = useRef<number>(0);
  const refReductionDuration = useRef<number>(0);

  const returnCb = (cb: Function, duration: number, options?: T) => {
    let lastId: number | null = null;
    let wasLastCall: boolean = false;
    let isFirstCall: boolean = true;
    let timeStart: null | number = null;

    const animate = (timestamp: number) => {
      if (lastId === null) lastId = refAnimateId.current;
      if (timeStart === null) timeStart = timestamp;
      const progress = timestamp - timeStart;
      let timeStopCalling = duration - refReductionDuration.current;
      if (progress <= timeStopCalling && refAnimateId.current === lastId) {
        cb(progress, duration, {
          ...options,
          isFirstCall,
          refStartPositionThisNode,
          refReductionDuration,
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
          refStartPositionThisNode,
          refReductionDuration,
        });
        wasLastCall = true;
      }
    };

    refAnimateId.current = requestAnimationFrame(animate);
    refStartPositionThisNode.current = 0;
    refReductionDuration.current = 0;
  };
  return returnCb;
};
export default useAnimationFrame;
