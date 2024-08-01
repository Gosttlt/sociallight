import clsx from "clsx";

import s from "./SettingSwitcher.module.scss";
import type { SettingSwitcherComponentType } from "./SettingSwitcher.types";
import DoubleChevronSvg from "@/6Shared/assets/svg/DoubleChevron.svg";

const SettingSwitcher: SettingSwitcherComponentType = (props) => {
  const { isOpen, onSwitch } = props;

  return (
    <div className={s.settingSwitchWrapper} onClick={onSwitch}>
      <DoubleChevronSvg
        className={clsx(s.settingSwitchSvg, { [s.close]: !isOpen })}
      />
    </div>
  );
};

export default SettingSwitcher;
