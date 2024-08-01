import { getClient } from "@/6Shared/api/gql/client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";
import TaskColumn from "@/3Widgets/TaskColumn";

export default async function Home() {
  return (
    <Layout header={<Header />} sidebar={<Sidebar />} footer={<div>123</div>}>
      <Catigories />
      <TaskColumn />
    </Layout>
  );
}
