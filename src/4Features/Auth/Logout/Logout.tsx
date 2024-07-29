import { useAppDispatch, useAppSelector } from "@/6Shared/hooks/reduxHooks";
import type { LogoutComponentType } from "./Logout.types";
import { fetchLogoutUser } from "@/5Entities/Auth/model/userThink";
import fingerprint from "@/6Shared/api/utils/fingerprint";
import Button from "@/6Shared/uikit/Button";
import { selectUser } from "@/5Entities/Auth/model/userSelectors";

const Logout: LogoutComponentType = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(selectUser);

  const logoutUser = async () => {
    try {
      dispatch(
        fetchLogoutUser({ userId: userId!, fingerprint: fingerprint() })
      );
    } catch (error) {
      console.log("error");
    }
  };

  return <Button onClick={logoutUser}>Выйти</Button>;
};

export default Logout;
