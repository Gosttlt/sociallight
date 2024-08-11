"use client";

import clsx from "clsx";

import s from "./TaskColumn.module.scss";
import type { TaskColumnComponentType } from "./TaskColumn.types";

import TaskCard from "@/5Entities/Task/ui/TaskCard";

import { useContext, useState } from "react";
import Sort from "@/4Features/Tasks/Сolumn/Sort";
import Filter from "@/4Features/Tasks/Сolumn/Filter";
import RemoveCard from "@/4Features/Tasks/Card/RemoveCard";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import LevelSelector from "@/4Features/Tasks/Card/LevelSelector";
import EditTaskBtn from "@/4Features/Tasks/Card/EditTaskBtn";
import InputTask from "@/4Features/Tasks/Card/InputTask";
import { TaskContext } from "@/1Config/Providers/Task";

const TaskColumn: TaskColumnComponentType = (props) => {
  const { data } = props;

  const { focusId } = useContext(TaskContext);

  return (
    <div className={clsx(s.tasksWrapper)}>
      <div className={s.headWrapper}>
        <div className={s.filtersBlock}>
          <Sort />
          <Filter />
          <RemoveCard variant="column" id={data.id} />
        </div>
        <InputTask
          variant="column"
          value={data.name}
          isFocus={data.id === focusId}
          id={data.id}
        />
        {/* <div className={s.headText}>{data.name}</div> */}
      </div>
      <CreateTaskInput variant="task" parentId={data.id} />
      {data?.tasks
        ? data?.tasks.map((task) => (
            <TaskCard
              isCreate={task.id === focusId}
              key={task.id}
              levelSelectors={[{ Selector: LevelSelector, text: "Приоритет" }]}
              EditTaskBtn={<EditTaskBtn />}
            >
              <InputTask
                isFocus={task.id === focusId}
                value={task.name}
                id={task.id}
                variant="task"
              />
              <RemoveCard variant="task" id={task.id} />
            </TaskCard>
          ))
        : null}
    </div>
  );
};

export default TaskColumn;
