"use client";

import clsx from "clsx";

import s from "./Tasks.module.scss";
import type { TasksComponentType } from "./Tasks.types";
import Sort from "@/4Features/Tasks/Sort";
import Filter from "@/4Features/Tasks/Filter";
import AddTodoBtn from "@/4Features/Tasks/AddTodoBtn";
import TasksCard from "@/5Entities/Tasks/ui/TasksCard";
import LevelSelector from "@/4Features/Tasks/LevelSelector";
import EditTaskBtn from "@/4Features/Tasks/EditTaskBtn";
import DragAndDropCard from "@/4Features/Tasks/DragAndDropCard";
import RemoveCard from "@/4Features/Tasks/RemoveCard";
import InputTask from "@/4Features/Tasks/InputTask";

const Tasks: TasksComponentType = () => {
  return (
    <div className={clsx(s.tasksWrapper)}>
      <div className={s.headWrapper}>
        <div>Сделать</div>
        <div className={s.filtersBlock}>
          <Sort />
          <Filter />
        </div>
      </div>
      <AddTodoBtn />
      <TasksCard
        levelSelectors={[{ Selector: LevelSelector, text: "Приоритет" }]}
        EditTaskBtn={<EditTaskBtn />}
      >
        <DragAndDropCard />
        <RemoveCard />
        <InputTask />
      </TasksCard>
    </div>
  );
};

export default Tasks;
