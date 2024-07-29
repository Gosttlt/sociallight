import s from "./DragAndDropCard.module.scss";
import type { DragAndDropCardComponentType } from "./DragAndDropCard.types";
import MaximizeSvg from "@/6Shared/assets/svg/Maximize.svg";

const DragAndDropCard: DragAndDropCardComponentType = () => {
  return (
    <div draggable className={s.dragAndDropWrapper}>
      <MaximizeSvg className={s.maximizeSvg} />
    </div>
  );
};

export default DragAndDropCard;
