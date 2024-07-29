import Collapse from "@/6Shared/uikit/Collapse/Collapse";
import s from "./TasksCard.module.scss";
import type { TasksCardComponentType } from "./TasksCard.types";
import SettingSwitcher from "./SettingSwitcher/SettingSwitcher";

const TasksCard: TasksCardComponentType = (props) => {
  const { className = "", children, EditTaskBtn, levelSelectors } = props;

  return (
    <div className={s.cardWrapper}>
      {children}
      <Collapse toggleBtn={<SettingSwitcher />}>
        <div className={s.settingWrapper}>
          <div className={s.settingButtons}>{EditTaskBtn}</div>
          {levelSelectors.map(({ text, Selector }) => {
            return (
              <div key={text} className={s.settingLevelWrapper}>
                <div>{text}:</div>
                <Selector />
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default TasksCard;
