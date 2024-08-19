"use client";
import Layout from "@/1Config/Layout";
import Header from "@/3Widgets/Header";
import Sidebar from "@/3Widgets/Sidebar";
import Catigories from "@/3Widgets/Catigories";

import TaskContextProvider from "@/1Config/Providers/Task";
import TaskColumns from "@/3Widgets/TaskColumns";
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import { useState } from "react";
import { DndItemDataType } from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem.types";
import { sortDndFn } from "@/6Shared/uikit/Dnd/utils";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";
import Category from "@/4Features/Tasks/Category";

const cats = [
  { name: "Работа0", id: "clzmd1bym0000e9dlc2szkfgb1", order: 0 },
  { name: "Покупки1", id: "clzmd1bym0000e9dlc2szkfgb2", order: 1 },
  { name: "Лес5", id: "clzmd1bym0000e9dlc2szkfgb6", order: 5 },
  { name: "Дом2", id: "clzmd1bym0000e9dlc2szkfgb3", order: 2 },
  { name: "Улица3", id: "clzmd1bym0000e9dlc2szkfgb4", order: 3 },
  { name: "Занятия4", id: "clzmd1bym0000e9dlc2szkfgb5", order: 4 },
];

export default function Home() {
  const [data, setData] = useState(cats.sort(sortDndFn));
  return (
    <Layout header={<Header />} sidebar={<Sidebar />}>
      <TaskContextProvider>
        <Catigories />
        <TaskColumns />
      </TaskContextProvider>
    </Layout>
  );
}
