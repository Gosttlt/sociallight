"use client";
import clsx from "clsx";

import s from "./Catigories.module.scss";
import type { CatigoriesComponentType } from "./Catigories.types";
import Category from "@/4Features/Tasks/Category";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  TasksCategoriesResponseType,
  TasksCategoryType,
} from "@/6Shared/api/types/TaskCategory";
import { GET_TASKS_CATEGORIES } from "@/6Shared/api/gql/requests/Task";
import { TaskContext } from "@/1Config/Providers/Task";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";
import useApi from "@/4Features/Tasks/Category/api/mutation";
import { sortDndFn } from "@/6Shared/uikit/Dnd/utils";

const Catigories: CatigoriesComponentType = (props) => {
  const { activeId, setActiveId } = useContext(TaskContext);
  const { data } = useQuery<TasksCategoriesResponseType>(GET_TASKS_CATEGORIES);
  const setData = useApi();
  const setDataFn = (
    newData: Array<Partial<TasksCategoryType> & { __typename?: string }>
  ) => {
    setData({
      variables: {
        categories: newData.map((el) => {
          let newEl = { ...el };
          if (el.__typename) {
            delete newEl.__typename;
            delete newEl.name;
          }
          return newEl;
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
  console.log(data);

  return (
    <div className={clsx(s.catigoriesWrapper)}>
      <Dnd
        direction={{ name: "width", value: 192 }}
        items={data?.taskCategories}
        setData={setDataFn}
      >
        {data &&
          data.taskCategories.toSorted(sortDndFn).map(({ id, name, order }) => (
            <DndItem data={{ id, order }} key={id}>
              <Category
                onClick={() => setActiveId(id)}
                name={name}
                isActive={activeId === id}
                id={id}
              />
            </DndItem>
          ))}
      </Dnd>
      <CreateTaskInput parentId={activeId} variant="category" />
    </div>
  );
};

export default Catigories;
