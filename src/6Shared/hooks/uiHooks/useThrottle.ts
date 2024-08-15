import { useCallback, useRef } from "react";

const useThrottle = <K extends Function, R extends K["arguments"]>(
  cb: K,
  ms: number = 300
) => {
  const lastCall = useRef<number>(Date.now());

  return useCallback(
    (...args: R) => {
      if (Date.now() >= lastCall.current + ms) {
        lastCall.current = Date.now();
        cb(...args);
      }
    },
    [cb, ms]
  );
};

export default useThrottle;
