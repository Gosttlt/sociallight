import clsx from 'clsx'

import s from './Tooltip.module.scss'
import type {DirectionTooltip, TooltipComponentType} from './Tooltip.types'
import {Children, createElement, useRef, useState} from 'react'

const getMiddle = ({
  containerNode,
  direction,
  tooltipNode,
}: {
  containerNode: null | HTMLDivElement
  tooltipNode: null | HTMLDivElement
  direction: DirectionTooltip
}) => {
  if (containerNode && tooltipNode) {
    const {height, width} = containerNode.getBoundingClientRect()
    const {height: tooltipHeight, width: tooltipWidth} =
      tooltipNode.getBoundingClientRect()
    if (direction === 'bottom' || direction === 'top') {
      const tooltipMiddle = tooltipWidth / 2
      const containerMiddle = width / 2
      const style = {
        [direction]: `calc(${-tooltipHeight}px - 10px)`,
        left: containerMiddle - tooltipMiddle,
      }
      return style
    }
    //
    else if (direction === 'left' || direction === 'right') {
      const tooltipMiddle = tooltipHeight / 2
      const containerMiddle = height / 2
      console.log(containerMiddle)
      console.log(tooltipMiddle)
      const style = {
        [direction]: `calc(${-tooltipWidth}px - 10px)`,
        top: containerMiddle - tooltipMiddle,
      }
      return style
    }
  }
}

const Tooltip: TooltipComponentType = props => {
  const {
    className = '',
    children,
    text,
    direction = 'top',
    width,
    isShow,
  } = props
  const [containerNode, setContainerNode] = useState<null | HTMLDivElement>(
    null,
  )
  const [tooltipNode, setTooltipNode] = useState<null | HTMLDivElement>(null)

  const style = getMiddle({
    containerNode: containerNode,
    direction,
    tooltipNode: tooltipNode,
  })

  return (
    <div className={clsx(s.tooltipWrapper, className)}>
      <div ref={setContainerNode}>{children}</div>
      {isShow && (
        <div
          style={{...style, width: width ? width + 'px' : 'fit-content'}}
          ref={setTooltipNode}
          className={s.textWrapper}
        >
          <span>{text}</span>
          <span className={clsx(s.triangle, [s[direction]])}></span>
        </div>
      )}
    </div>
  )
}

export default Tooltip
