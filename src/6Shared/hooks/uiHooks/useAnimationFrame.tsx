import { MutableRefObject, useEffect, useRef } from "react";

// const useAnimationFrame = (callback: CallableFunction) => {
//   const requestRef = useRef<null | number>(null);
//   const previousTimeRef = useRef<null | number>(null);

//   const animate = (time: number) => {
//     if (previousTimeRef.current != undefined) {
//       const deltaTime = time - previousTimeRef.current;
//       callback(deltaTime);
//     }
//     previousTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, []);
// };
// export default useAnimationFrame;
const useAnimationFrame = (ref: MutableRefObject<HTMLElement | null>) => {
  const refTimeStart = useRef<null | number>(null);
  const refAnimateId = useRef<null | number>(null);

  const fn = (cb: Function, duration: number) => {
    let lastId: number | null = null;

    const animate = (timestamp: number) => {
      if (!lastId) {
        lastId = refAnimateId.current;
      }

      if (!refTimeStart.current) refTimeStart.current = timestamp;
      const progress = timestamp - refTimeStart.current;
      if (progress <= duration && refAnimateId.current === lastId) {
        cb(progress, duration, ref);
        requestAnimationFrame(animate);
      }
    };

    refAnimateId.current = requestAnimationFrame(animate);
    refTimeStart.current = null;
  };
  return fn;
};
export default useAnimationFrame;
