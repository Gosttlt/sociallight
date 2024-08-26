"use client";

import clsx from "clsx";

import s from "./TaskColumn.module.scss";
import type { TaskColumnComponentType } from "./TaskColumn.types";

import TaskCard from "@/5Entities/Task/ui/TaskCard";

import { useContext } from "react";
import Sort from "@/4Features/Tasks/Сolumn/Sort";
import Filter from "@/4Features/Tasks/Сolumn/Filter";
import RemoveCard from "@/4Features/Tasks/Card/RemoveCard";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import LevelSelector from "@/4Features/Tasks/Card/LevelSelector";
import EditTaskBtn from "@/4Features/Tasks/Card/EditTaskBtn";
import InputTask from "@/4Features/Tasks/Card/InputTask";
import { TaskContext } from "@/1Config/Providers/Task";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";
import useApi from "@/4Features/Tasks/UpdateOrder/api/mutation";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";
import { DndContext } from "@/1Config/Providers/Dnd";

const TaskColumn: TaskColumnComponentType = (props) => {
  const {
    setExternalCurrentTarget,
    setFromItems,
    setToItems,
    externalCurrentTarget,
    fromItems,
    toItems,
  } = useContext(DndContext);

  console.log("externalCurrentTarget", externalCurrentTarget);
  console.log("fromItems", fromItems);
  console.log("toItems", toItems);
  const { data } = props;
  const setData = useApi("task", data.categoryId, data.id);

  const setDataFn = (newData: Array<Partial<TasksCulumnType>>) => {
    setData({
      variables: {
        tasks: newData.map(({ id, order }) => {
          return { id, order };
        }),
      },
    });
  };

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
      </div>
      <CreateTaskInput variant="task" parentId={data.id} />
      <Dnd
        direction={{
          name: "height",
          value: 34,
          paddingDefolt: 4,
          paddingStreach: 20,
        }}
        items={data?.tasks}
        setData={setDataFn}
        sharedClass="taskDnd"
      >
        {data?.tasks &&
          data?.tasks.map((task) => (
            <DndItem key={task.id} data={{ id: task.id, order: task.order }}>
              <TaskCard
                isCreate={task.id === focusId}
                key={task.id}
                levelSelectors={[
                  { Selector: LevelSelector, text: "Приоритет" },
                ]}
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
            </DndItem>
          ))}
      </Dnd>
    </div>
  );
};

export default TaskColumn;
