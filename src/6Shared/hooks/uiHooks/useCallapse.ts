import { useCallback, useRef, useState } from "react";

const useCollapse = (delay: number = 300) => {
  const [isOpen, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isBlock, setBlock] = useState(false);

  const onSwitch = useCallback(() => {
    if (!isOpen) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setBlock(true);
      setTimeout(() => {
        setOpen(true);
      });
    } else {
      setOpen(false);
      timeout.current = setTimeout(() => {
        setBlock(false);
      }, delay);
    }
  }, [isOpen, isBlock, delay]);

  return { onSwitch, isOpen, isBlock };
};

export default useCollapse;
