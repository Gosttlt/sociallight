import clsx from "clsx";

import s from "./RemoveCard.module.scss";
import type { RemoveCardComponentType } from "./RemoveCard.types";
import CloseSvg from "@/6Shared/assets/svg/Close.svg";
import useApi from "../api/mutation";
import { MouseEvent, useContext } from "react";
import { TaskContext } from "@/1Config/Providers/Task";

const RemoveCard: RemoveCardComponentType = (props) => {
  const { id, variant, className } = props;
  const { activeId, setActiveId } = useContext(TaskContext);
  const deleteTask = useApi(variant, activeId, setActiveId);

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    deleteTask({ variables: { id } });
  };
  return <CloseSvg onClick={onClick} className={clsx(s.closeSvg, className)} />;
};

export default RemoveCard;
