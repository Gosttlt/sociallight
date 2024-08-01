"use client";

import clsx from "clsx";

import s from "./TaskColumn.module.scss";
import type { TaskColumnComponentType } from "./TaskColumn.types";
import Sort from "@/4Features/Tasks/Sort";
import Filter from "@/4Features/Tasks/Filter";
import TaskCard from "@/5Entities/Task/ui/TaskCard";
import LevelSelector from "@/4Features/Tasks/LevelSelector";
import EditTaskBtn from "@/4Features/Tasks/EditTaskBtn";
import RemoveCard from "@/4Features/Tasks/RemoveCard";
import InputTask from "@/4Features/Tasks/InputTask";
import CreateTaskInput from "@/4Features/Tasks/CreateTaskInput";
import { gql, useQuery } from "@apollo/client";
import { TaskType } from "@/6Shared/types/Task";
import { useState } from "react";

const GET_TASKS = gql`
  query GetTask {
    tasks {
      id
      name
    }
  }
`;

const TaskColumn: TaskColumnComponentType = () => {
  const { data, loading } = useQuery<{ tasks: TaskType[] }>(GET_TASKS);
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
        <div className={s.headText}>Сделать</div>
      </div>
      <CreateTaskInput onChangeName={onChangeName} />
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
