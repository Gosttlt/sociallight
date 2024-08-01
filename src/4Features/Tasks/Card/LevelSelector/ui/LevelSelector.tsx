import s from "./LevelSelector.module.scss";
import type { LevelSelectorComponentType } from "./LevelSelector.types";
import ChevronSvg from "@/6Shared/assets/svg/Chevron.svg";

const LevelSelector: LevelSelectorComponentType = () => {
  return (
    <div className={s.settingLevelButtonWrapper}>
      <div className={s.settingLevelText}>2</div>
      <ChevronSvg className={s.settingLevelChevron} />
    </div>
  );
};

export default LevelSelector;
