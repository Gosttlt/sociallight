"use client";
import clsx from "clsx";

import s from "./Catigories.module.scss";
import type { CatigoriesComponentType } from "./Catigories.types";
import Category from "@/4Features/Tasks/Category";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  TasksCategoriesResponseType,
  TasksCategoryType,
} from "@/6Shared/api/types/TaskCategory";
import { GET_TASKS_CATEGORIES } from "@/6Shared/api/gql/requests/Task";
import { TaskContext } from "@/1Config/Providers/Task";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";
import useApi from "@/4Features/Tasks/UpdateOrder/api/mutation";
import { DndItemDataType } from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem.types";

const Catigories: CatigoriesComponentType = (props) => {
  const { activeId, setActiveId } = useContext(TaskContext);
  const { data } = useQuery<TasksCategoriesResponseType>(GET_TASKS_CATEGORIES);

  const setData = useApi("category");
  const setDataFn = (fromData: Array<DndItemDataType>) => {
    setData({
      variables: {
        categories: fromData.map(({ id, order }) => {
          return { id, order };
        }),
      },
    });
  };
  useEffect(() => {
    let curId = data?.taskCategories ? data.taskCategories[0]?.id : null;
    if (activeId === null && curId) {
      setActiveId(curId);
    }
  }, [data]);

  return (
    <div className={clsx(s.catigoriesWrapper)}>
      <Dnd
        direction={{
          name: "width",
          value: 192,
          paddingDefolt: 10,
          paddingStreach: 60,
        }}
        items={data?.taskCategories}
        setData={setDataFn}
        sharedClass="taskCategoryDnd"
        wrapperId="taskCategoryDnd"
      >
        {data &&
          data.taskCategories.map((category, index) => (
            <DndItem data={category} key={category.id}>
              <Category
                onClick={() => setActiveId(category.id)}
                name={category.name}
                isActive={activeId === category.id}
                id={category.id}
              />
            </DndItem>
          ))}
      </Dnd>
      <CreateTaskInput
        className={s.creatTaskInput}
        parentId={activeId}
        variant="category"
      />
    </div>
  );
};

export default Catigories;
