import clsx from "clsx";

import s from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { MouseEvent, useEffect, useRef, useState } from "react";

const Dnd: DndComponentType = (props) => {
  const { className = "", children } = props;

  const [isDrag, setDrag] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const difference = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    ref.current = e.currentTarget;
    const xMouse = e.clientX;
    const yMouse = e.clientY;
    const { x, y } = ref.current?.getBoundingClientRect();
    difference.current = { x: xMouse - x, y: yMouse - y };
    ref.current.style.background = "red";
    ref.current.style.position = "absolute";
    ref.current.style.zIndex = "1000";
    ref.current.style.top = `${yMouse - difference.current.y}px`;
    ref.current.style.left = `${xMouse - difference.current.x}px`;

    setDrag(true);
  };
  const onMouseUp = () => {
    setDrag(false);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (isDrag && e.buttons) {
      console.log(e);

      const x = e.clientX;
      const y = e.clientY;
      if (ref.current) {
        ref.current.style.top = `${y - difference.current.y}px`;
        ref.current.style.left = `${x - difference.current.x}px`;
      }
    }
    if (!e.buttons) {
      setDrag(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDrag]);

  useEffect(() => {
    document.addEventListener("dragover", (e) => {
      console.log("dragover", e);
    });
    return () => {
      document.addEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div id="asdasd123321dsa" className={clsx(s.dndWrapper, className)}>
      <div onMouseDown={onMouseDown} className={s.item}>
        1
      </div>
      <div onMouseDown={onMouseDown} className={s.item}>
        2
      </div>
      <div onMouseDown={onMouseDown} className={s.item}>
        3
      </div>
      <div onMouseDown={onMouseDown} className={s.item}>
        4
      </div>
      <div>
        <div onMouseDown={onMouseDown} className={s.item}>
          5
        </div>
      </div>
    </div>
  );
};

export default Dnd;
