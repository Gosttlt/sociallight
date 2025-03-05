import type {FC, ReactNode} from 'react'

export type TooltipComponentType = FC<TooltipProps>

export type DirectionTooltip = 'left' | 'right' | 'bottom' | 'top'

export type TooltipProps = {
  children: ReactNode | string
  className?: string
  text: string
  direction?: DirectionTooltip
  width?: number
  isShow: boolean
}
