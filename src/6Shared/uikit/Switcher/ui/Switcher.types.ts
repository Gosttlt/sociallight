import type {ChangeEvent, FC} from 'react'

export type SwitcherComponentType = FC<SwitcherProps>

export type SwitcherProps = {
  className?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
