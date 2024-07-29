import clsx from "clsx";

import s from "./RemoveCard.module.scss";
import type { RemoveCardComponentType } from "./RemoveCard.types";
import CloseSvg from "@/6Shared/assets/svg/Close.svg";

const RemoveCard: RemoveCardComponentType = () => {
  return <CloseSvg className={s.closeSvg} />;
};

export default RemoveCard;
