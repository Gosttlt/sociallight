import { useAppDispatch, useAppSelector } from "6Shared/hooks/reduxHooks";
import type { RegisterComponentType } from "./Register.types";
import Button from "6Shared/uikit/Button";
import fingerprint from "6Shared/api/utils/fingerprint";
import { fetchRegisterUser } from "5Entities/Auth/model/userThink";
import { selectUser } from "5Entities/Auth/model/userSelectors";

const Register: RegisterComponentType = (props) => {
  const { login, password } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const registerUser = async () => {
    try {
      dispatch(fetchRegisterUser({ email: login, password, fingerprint: fingerprint() }));
    } catch (error) {
      console.log("error");
    }
  };

  return <Button onClick={registerUser}>Зарегистрироваться</Button>;
};

export default Register;
