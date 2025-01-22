"use client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";

import TaskContextProvider from "@/1Config/Providers/Task";
import DndContextProvider from "@/1Config/Providers/Dnd";
import TaskColumns from "@/3Widgets/TaskColumns";
import Test from "@/Test/Test";
import ItemsTest from "@/ItemsTest/ItemsTest";
import { menuItems } from "@/3Widgets/Sidebar/assets";

export default function Home() {
  return (
    <Layout header={<Header />} sidebar={<Sidebar menuItems={menuItems} />}>
      <TaskContextProvider>
        <DndContextProvider>
          {/* <Catigories />
          <TaskColumns /> */}
          <ItemsTest />
          {/* <Test /> */}
        </DndContextProvider>
      </TaskContextProvider>
    </Layout>
  );
}
