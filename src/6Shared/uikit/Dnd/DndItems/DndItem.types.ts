import type {FC, ReactNode} from 'react'
import {DndItemDataType} from '../utils/utils'

export type DndItemComponentType = FC<DndItemProps>

export type DndItemProps = {
  children?: ReactNode
  className?: string
  index: number
  card: DndItemDataType
  reverse?: boolean
}
