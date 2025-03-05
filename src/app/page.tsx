'use client'
import Layout from '@/1Config/Layout'
import Header from '@/3Widgets/Header'
import Sidebar from '@/3Widgets/Sidebar'
import Catigories from '@/3Widgets/Catigories'

import TaskColumns from '@/3Widgets/TaskColumns'
import {sidebarMenuItems} from '@/3Widgets/Sidebar/assets'
import ItemsTest from '@/ItemsTest/ItemsTest'
import {useEffect} from 'react'
import {useDndStore} from '@/6Shared/uikit/Dnd/State'

export default function Home() {
  const setDragReady = useDndStore(state => state.setDragReady)
  useEffect(() => {
    const setDragReadyHandler = (e: KeyboardEvent) => {
      if (e.altKey) {
        setDragReady(true)
      }
    }
    const unsetDragReadyHandler = (e: KeyboardEvent) => {
      if (!e.altKey) {
        setDragReady(false)
      }
    }

    document.addEventListener('keydown', setDragReadyHandler)
    document.addEventListener('keyup', unsetDragReadyHandler)

    return () => {
      document.removeEventListener('keydown', setDragReadyHandler)
      document.removeEventListener('keyup', unsetDragReadyHandler)
    }
  }, [])

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
