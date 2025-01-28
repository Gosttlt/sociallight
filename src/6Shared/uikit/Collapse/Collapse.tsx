import clsx from "clsx";

import s from "./Collapse.module.scss";
import type { CollapseComponentType } from "./Collapse.types";
import { useRef } from "react";

const Collapse: CollapseComponentType = (props) => {
  const { children, isBlock, isOpen } = props;
  const collapsBody = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={collapsBody}
      style={isBlock === false ? { display: "none" } : {}}
      className={clsx(s.collapsWrapper, { [s.open]: isOpen })}
    >
      {children}
    </div>
  );
};

export default Collapse;
