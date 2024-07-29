import clsx from "clsx";

import * as s from "./AuthForm.module.scss";
import type { AuthFormComponentType } from "./AuthForm.types";

const AuthForm: AuthFormComponentType = (props) => {
  const { SendButton, Inputs } = props;

  return (
    <div className={s.authBlock}>
      <div className={s.inputBlock}>{Inputs}</div>
      {SendButton}
    </div>
  );
};

export default AuthForm;
