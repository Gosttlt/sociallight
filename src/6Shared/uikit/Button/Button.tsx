import clsx from "clsx";

import * as s from "./Button.module.scss";
import type { ButtonComponentType } from "./Button.types";

const Button: ButtonComponentType = (props) => {
  const { className = "", children, onClick } = props;

  return (
    <button onClick={onClick} className={clsx(s.buttonWrapper, className)}>
      {children}
    </button>
  );
};

export default Button;
