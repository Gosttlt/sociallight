import type { InputsComponentType } from "./Inputs.types";
import Input from "6Shared/uikit/Input";
import { isEmailValid } from "./utils";
import { selectUser } from "5Entities/Auth/model/userSelectors";
import { useAppDispatch, useAppSelector } from "6Shared/hooks/reduxHooks";
import { setFieldAction } from "5Entities/Auth/model/userSlice";
import { authFieldsType } from "5Entities/Auth/model/types";

const Inputs: InputsComponentType = () => {
  const { login, password } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onChange = ({ prop, value }: authFieldsType) => {
    // if (prop == "email" && !isEmailValid(value)) {
    //   return;
    // }

    dispatch(setFieldAction({ prop, value }));
  };

  return (
    <>
      <Input value={login} onChange={(e) => onChange({ prop: "login", value: e.target.value })} />

      <Input value={password} onChange={(e) => onChange({ prop: "password", value: e.target.value })} />
    </>
  );
};

export default Inputs;
