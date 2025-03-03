'use client'
import Layout from '@/1Config/Layout'
import Header from '@/3Widgets/Header'
import Sidebar from '@/3Widgets/Sidebar'
import Catigories from '@/3Widgets/Catigories'

import TaskColumns from '@/3Widgets/TaskColumns'
import {sidebarMenuItems} from '@/3Widgets/Sidebar/assets'
import ItemsTest from '@/ItemsTest/ItemsTest'

export default function Home() {
  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar menuItems={sidebarMenuItems} />}
    >
      <Catigories />
      <TaskColumns />
      {/* <ItemsTest /> */}
      {/* <Test /> */}
    </Layout>
  )
}
