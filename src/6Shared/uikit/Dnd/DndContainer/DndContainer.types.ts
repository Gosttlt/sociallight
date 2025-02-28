import type {FC, ReactNode} from 'react'
import {DndItemDataType} from '../utils/utils'

export type DndContainerComponentType = FC<DndContainerProps>

export type ReturnsortCbItems = {
  fromCard: DndItemDataType[]
  fromId: string
  toCard?: DndItemDataType[] | null
  toID?: string | null
}

export type DndContainerProps = {
  containerId: string
  children?: ReactNode
  className?: string
  items: DndItemDataType[]
  sharedId: string
  setData: (args: ReturnsortCbItems) => void
}
