import clsx from "clsx";

import s from "./CreateTaskInput.module.scss";
import { CreateTaskInputComponentType } from "./CreateTaskInput.types";
import Input from "@/6Shared/uikit/Input";
import { ChangeEvent, useState } from "react";
import useApi from "../api/mutation";

const CreateTaskInput: CreateTaskInputComponentType = (props) => {
  const { className = "", onChangeName, columnId } = props;

  const [value, setValue] = useState("");
  const [isFocuse, setFocuse] = useState(false);

  const createTask = useApi(onChangeName, setValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    createTask({ variables: { name: e.target.value, columnId: columnId } });
  };

  return (
    <Input
      onFocus={() => setFocuse(true)}
      onBlur={() => setFocuse(false)}
      value={value}
      onChange={onChange}
      className={clsx(s.createTaskInputWrapper, className)}
      placeholder={isFocuse ? "" : "...Новая задача"}
    />
  );
};

export default CreateTaskInput;
