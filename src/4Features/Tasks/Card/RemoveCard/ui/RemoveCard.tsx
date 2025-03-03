import clsx from 'clsx'

import s from './RemoveCard.module.scss'
import type {RemoveCardComponentType} from './RemoveCard.types'
import CloseSvg from '@public/assets/svg/Close.svg'
import useApi from '../api/mutation'
import {MouseEvent} from 'react'
import {useHomePageStore} from '@/app/home/model'

const RemoveCard: RemoveCardComponentType = props => {
  const {id, variant, className} = props
  const {activeId, setActiveId} = useHomePageStore()
  const deleteTask = useApi(variant, activeId, setActiveId)

  const onClick = (e: MouseEvent) => {
    e.stopPropagation()
    deleteTask({variables: {id}})
  }
  return <CloseSvg onClick={onClick} className={clsx(s.closeSvg, className)} />
}

export default RemoveCard
