import clsx from "clsx";

import s from "./RemoveCard.module.scss";
import type { RemoveCardComponentType } from "./RemoveCard.types";
import CloseSvg from "@/6Shared/assets/svg/Close.svg";
import useApi from "../api/mutation";

const RemoveCard: RemoveCardComponentType = (props) => {
  const { id, variant } = props;
  const deleteTask = useApi(variant);

  return (
    <CloseSvg
      onClick={() => deleteTask({ variables: { id } })}
      className={s.closeSvg}
    />
  );
};

export default RemoveCard;
