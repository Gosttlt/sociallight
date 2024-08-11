import clsx from "clsx";

import s from "./CreateTaskInput.module.scss";
import { CreateTaskInputComponentType } from "./CreateTaskInput.types";
import Input from "@/6Shared/uikit/Input";
import { ChangeEvent, useContext, useState } from "react";
import createInputConfig from "../config";
import useApi from "../api/mutation";
import { TaskContext } from "@/1Config/Providers/Task";

const CreateTaskInput: CreateTaskInputComponentType = (props) => {
  const { className = "", parentId, variant } = props;
  const { parentName, placeholder } = createInputConfig[variant];

  const { activeId, setFocusId } = useContext(TaskContext);

  const [value, setValue] = useState("");
  const [isFocus, setFocus] = useState(false);

  const create = useApi({
    cb: setFocusId,
    setValue,
    variant,
    parentId,
    activeId,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    create({ variables: { name: e.target.value, [parentName]: parentId } });
  };

  return (
    <Input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={value}
      onChange={onChange}
      className={clsx(s.createTaskInputWrapper, s[variant], className)}
      placeholder={isFocus ? "" : placeholder}
    />
  );
};

export default CreateTaskInput;
