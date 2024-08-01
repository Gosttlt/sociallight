import clsx from "clsx";

import s from "./Collapse.module.scss";
import type { CollapseComponentType } from "./Collapse.types";
import { cloneElement, useRef, useState } from "react";

const Collapse: CollapseComponentType = (props) => {
  const { children, isBlock, isOpen } = props;
  const collapsBody = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div
        ref={collapsBody}
        style={{
          height: isOpen ? collapsBody.current?.scrollHeight : 0,
          display: isBlock ? "block" : "none",
        }}
        className={clsx(s.collapsWrapper, { [s.open]: isOpen })}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
