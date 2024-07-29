import clsx from "clsx";

import * as s from "./Input.module.scss";
import type { InputComponentType } from "./Input.types";

const Input: InputComponentType = (props) => {
  const { className = "", stateBorder = "novalid", ...other } = props;

  return <input {...other} className={clsx(s.inputWrapper, className, s[stateBorder])} />;
};

export default Input;
