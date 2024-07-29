import Button from "6Shared/uikit/Button";
import type { LoginComponentType } from "./Login.types";
import { useAppDispatch, useAppSelector } from "6Shared/hooks/reduxHooks";
import fingerprint from "6Shared/api/utils/fingerprint";
import { fetchLoginUser } from "5Entities/Auth/model/userThink";
import { selectUser } from "5Entities/Auth/model/userSelectors";

const Login: LoginComponentType = () => {
  const { login, password } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const loginUser = async () => {
    try {
      dispatch(fetchLoginUser({ email: login, password, fingerprint: fingerprint() }));
    } catch (error) {
      console.log("error");
    }
  };

  return <Button onClick={loginUser}>Войти</Button>;
};

export default Login;
