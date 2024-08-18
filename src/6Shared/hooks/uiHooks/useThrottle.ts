import { useCallback, useRef } from "react";

const useThrottle = <K extends Function, R extends K["arguments"]>(
  cb: K,
  ms: number = 300,
  delay: number = 0
) => {
  const lastCall = useRef<number>(Date.now() + delay);
  let lastValue: any = null;
  return useCallback(
    (...args: R) => {
      if (Date.now() >= lastCall.current + ms) {
        lastCall.current = Date.now();
        lastValue = cb(...args);
        return lastValue;
      }
      return lastValue;
    },
    [cb, ms, delay]
  );
};

export default useThrottle;
