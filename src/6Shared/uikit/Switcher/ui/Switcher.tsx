import clsx from 'clsx'

import s from './Switcher.module.scss'
import type {SwitcherComponentType} from './Switcher.types'
import {ChangeEvent, useState} from 'react'

const Switcher: SwitcherComponentType = props => {
  const {className = '', checked, onChange} = props

  return (
    <div className={s.wrapper}>
      <label
        className={clsx(s.switcherWrapper, {[s.active]: checked}, className)}
      >
        <input
          onChange={onChange}
          checked={checked}
          type='checkbox'
          className={s.input}
        />
        <span className={clsx(s.circle, {[s.active]: checked})}></span>
      </label>
    </div>
  )
}

export default Switcher
