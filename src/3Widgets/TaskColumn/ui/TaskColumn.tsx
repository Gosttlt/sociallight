"use client";

import clsx from "clsx";

import s from "./TaskColumn.module.scss";
import type { TaskColumnComponentType } from "./TaskColumn.types";

import TaskCard from "@/5Entities/Task/ui/TaskCard";

import { gql, useQuery } from "@apollo/client";
import { TaskType } from "@/6Shared/api/types/Task";
import { useState } from "react";
import Sort from "@/4Features/Tasks/Сolumn/Sort";
import Filter from "@/4Features/Tasks/Сolumn/Filter";
import RemoveCard from "@/4Features/Tasks/Card/RemoveCard";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import LevelSelector from "@/4Features/Tasks/Card/LevelSelector";
import EditTaskBtn from "@/4Features/Tasks/Card/EditTaskBtn";
import InputTask from "@/4Features/Tasks/Card/InputTask";

const TaskColumn: TaskColumnComponentType = (props) => {
  const { data } = props;

  const [newTaskId, setNewTaskId] = useState<null | string>(null);

  const onChangeName = (id: string) => {
    setNewTaskId(id);
  };

  return (
    <div className={clsx(s.tasksWrapper)}>
      <div className={s.headWrapper}>
        <div className={s.filtersBlock}>
          <Sort />
          <Filter />
          <RemoveCard id={"123"} />
        </div>
        <div className={s.headText}>{data.name}</div>
      </div>
      <CreateTaskInput columnId={data.id} onChangeName={onChangeName} />
      {data?.tasks &&
        data?.tasks.map((task) => (
          <TaskCard
            isCreate={task.id === newTaskId}
            key={task.id}
            levelSelectors={[{ Selector: LevelSelector, text: "Приоритет" }]}
            EditTaskBtn={<EditTaskBtn />}
          >
            <InputTask
              isFocus={task.id === newTaskId}
              value={task.name}
              id={task.id}
            />
            <RemoveCard id={task.id} />
          </TaskCard>
        ))}
    </div>
  );
};

export default TaskColumn;
