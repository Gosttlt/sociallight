"use client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";
import TaskColumn from "@/3Widgets/TaskColumn";
import AddColumn from "@/4Features/Tasks/Сolumn/AddColumn";
import { useQuery } from "@apollo/client";
import { GET_TASKS_COLUMNS } from "@/6Shared/api/gql/requests/Task";
import {
  TasksCulumnType,
  TasksCulumnTypeResponse,
} from "@/6Shared/api/types/TaskColumn";

export default function Home() {
  const { data } = useQuery<TasksCulumnTypeResponse>(GET_TASKS_COLUMNS);

  return (
    <Layout header={<Header />} sidebar={<Sidebar />} footer={<div>123</div>}>
      <Catigories />
      <div style={{ display: "flex", gap: "20px" }}>
        {data?.tasksColumns.map((column) => (
          <TaskColumn key={column.id} data={column} />
        ))}
        <AddColumn />
      </div>
    </Layout>
  );
}
