import type {FC, ReactNode} from 'react'

export type UserComponentType = FC<UserProps>

export type UserProps = {
  children: string | ReactNode
  className?: string
}
