"use client";
import clsx from "clsx";

import s from "./Catigories.module.scss";
import type { CatigoriesComponentType } from "./Catigories.types";
import Category from "@/4Features/Tasks/Category";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { TasksCategoriesResponseType } from "@/6Shared/api/types/TaskCategory";
import { GET_TASKS_CATEGORIES } from "@/6Shared/api/gql/requests/Task";
import { TaskContext } from "@/1Config/Providers/Task";

const Catigories: CatigoriesComponentType = (props) => {
  const { activeId, setActiveId } = useContext(TaskContext);
  const { data } = useQuery<TasksCategoriesResponseType>(GET_TASKS_CATEGORIES);

  useEffect(() => {
    let curId = data?.taskCategories ? data.taskCategories[0]?.id : null;
    if (activeId === null && curId) {
      setActiveId(curId);
    }
  }, [data]);

  return (
    <div className={clsx(s.catigoriesWrapper)}>
      {data &&
        data.taskCategories.map(({ id, name }) => (
          <Category
            onClick={() => setActiveId(id)}
            name={name}
            key={id}
            isActive={activeId === id}
            id={id}
          />
        ))}
      <CreateTaskInput parentId={activeId} variant="category" />
    </div>
  );
};

export default Catigories;
