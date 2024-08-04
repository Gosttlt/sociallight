"use client";
import clsx from "clsx";

import s from "./AddColumn.module.scss";
import type { AddColumnComponentType } from "./AddColumn.types";
import AddSvg from "@/6Shared/assets/svg/Add.svg";
import useApi from "../api/mutation";

const AddColumn: AddColumnComponentType = (props) => {
  const { className = "", children } = props;
  const createTaskColumn = useApi();
  return (
    <AddSvg
      onClick={() => createTaskColumn({ variables: { name: "asd" } })}
      className={s.addSvg}
    />
  );
};

export default AddColumn;
