import clsx from "clsx";

import * as s from "./Collapse.module.scss";
import type { CollapseComponentType } from "./Collapse.types";
import { cloneElement, useRef, useState } from "react";

const Collapse: CollapseComponentType = (props) => {
  const { children, toggleBtn } = props;
  const [isOpen, setOpen] = useState(false);
  const collapsBody = useRef<HTMLDivElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cloneToggleBtn = toggleBtn ? cloneElement(toggleBtn, { isOpen }) : null;

  const [isBlock, setBlock] = useState(false);

  const onSwitch = () => {
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
      }, 300);
    }
  };

  return (
    <div>
      <div
        ref={collapsBody}
        style={{ height: isOpen ? collapsBody.current?.scrollHeight : 0, display: isBlock ? "block" : "none" }}
        className={clsx(s.collapsWrapper, { [s.open]: isOpen })}
      >
        {children}
      </div>
      <div onClick={onSwitch}>{cloneToggleBtn}</div>
    </div>
  );
};

export default Collapse;
