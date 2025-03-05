'use client'
import clsx from 'clsx'

import s from './Category.module.scss'
import {CategoryProps} from './Category.types'
import RemoveCard from '../../Card/RemoveCard'
import {forwardRef, useRef} from 'react'
import {useDndCursor} from '@/6Shared/uikit/Dnd/utils/useDndCursor'

const Category = forwardRef<HTMLDivElement, CategoryProps>((props, ref) => {
  const node = useRef<null | HTMLDivElement>(null)
  const cursor = useDndCursor(node.current)
  const {className = '', isActive, name, onClick, id} = props

  return (
    <div
      ref={node}
      onClick={onClick}
      style={{cursor: cursor}}
      className={clsx(s.item, {[s.active]: isActive}, className)}
    >
      {name}
      <RemoveCard
        className={clsx(s.remove, {[s.noEvent]: cursor})}
        variant='category'
        id={id}
      />
    </div>
  )
})

Category.displayName = 'Category'

export default Category
