"use client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";
import TaskColumn from "@/3Widgets/TaskColumn";
import { useQuery } from "@apollo/client";

import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import { useState } from "react";
import { TasksCategoryResponseType } from "@/6Shared/api/types/TaskCategory";

import { GET_TASK_CATEGORY } from "@/4Features/Tasks/Category/api/gql";
import TaskContextProvider from "@/1Config/Providers/Task";

export default function Home() {
  const [focusId, setFocusId] = useState<null | string>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const onChangeFocus = (id: string) => {
    setFocusId(id);
  };

  const { data } = useQuery<TasksCategoryResponseType>(GET_TASK_CATEGORY, {
    variables: { id: activeId },
  });
  const onChangeActiveId = (id: string) => {
    setActiveId(id);
  };

  return (
    <Layout header={<Header />} sidebar={<Sidebar />} footer={<div>123</div>}>
      <TaskContextProvider>
        <Catigories activeId={activeId} onChangeActiveId={onChangeActiveId} />
        <div style={{ display: "flex", gap: "20px" }}>
          {data &&
            data?.taskCategory.columns.map((column) => (
              <TaskColumn
                activeId={activeId}
                focusId={focusId}
                onChangeFocus={onChangeFocus}
                key={column.id}
                data={column}
              />
            ))}
          <CreateTaskInput
            parentId={data?.taskCategory.id}
            onChangeFocus={onChangeFocus}
            variant="column"
          />
        </div>
      </TaskContextProvider>
    </Layout>
  );
}
