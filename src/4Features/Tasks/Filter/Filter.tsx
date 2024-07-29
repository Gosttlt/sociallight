import clsx from "clsx";

import s from "./Filter.module.scss";
import type { FilterComponentType } from "./Filter.types";
import FilterSvg from "@/6Shared/assets/svg/Filter.svg";

const Filter: FilterComponentType = () => {
  return <FilterSvg className={s.filterSvg} />;
};

export default Filter;
