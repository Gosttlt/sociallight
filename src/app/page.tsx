"use client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";

import TaskContextProvider from "@/1Config/Providers/Task";
import DndContextProvider from "@/1Config/Providers/Dnd";

import ItemsTest from "@/ItemsTest/ItemsTest";
import { sidebarMenuItems } from "@/3Widgets/Sidebar/assets";

export default function Home() {
  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar menuItems={sidebarMenuItems} />}
    >
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
