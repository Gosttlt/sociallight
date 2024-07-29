import { getClient } from "@/shared/api/gql/client";
import { gql } from "@apollo/client";
import { TaskType } from "@/shared/types/Task";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";
import Tasks from "@/3Widgets/Tasks";

const GET_LOCATIONS = gql`
  query GetTask {
    tasksgql {
      createdAt
      description
      id
      isCompleted
      name
      priority
      updatedAt
    }
  }
`;

export default async function Home() {
  console.log("------------------render------------------");
  const client = getClient();
  const { data } = await client.query<{ tasksgql: TaskType[] }>({
    query: GET_LOCATIONS,
  });
  return (
    <Layout header={<Header />} sidebar={<Sidebar />} footer={<div>123</div>}>
      <Catigories />
      <Tasks />
    </Layout>
  );
}
