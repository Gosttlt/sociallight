"use client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";

import TaskContextProvider from "@/1Config/Providers/Task";
import TaskColumns from "@/3Widgets/TaskColumns";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";

export default function Home() {
  return (
    <Layout header={<Header />} sidebar={<Sidebar />}>
      <Dnd />
      {/* <TaskContextProvider>
        <Catigories />
        <TaskColumns />
      </TaskContextProvider> */}
    </Layout>
  );
}
