import Input from "@/6Shared/uikit/Input";
import s from "./InputTask.module.scss";
import type { InputTaskComponentType } from "./InputTask.types";

const InputTask: InputTaskComponentType = () => {
  return <Input className={s.inputTask} />;
};

export default InputTask;
