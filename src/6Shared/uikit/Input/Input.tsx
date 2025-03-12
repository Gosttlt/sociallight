import clsx from 'clsx'

import s from './Input.module.scss'
import type {InputComponentType} from './Input.types'
import {forwardRef, memo} from 'react'

const Input = memo(
  forwardRef<HTMLInputElement, InputComponentType>((props, ref) => {
    const {className = '', stateBorder = 'novalid', propTitle, ...other} = props

    return (
      <>
        {propTitle && propTitle}
        <input
          ref={ref}
          {...other}
          className={clsx(s.inputWrapper, className, s[stateBorder])}
        />
      </>
    )
  }),
)

Input.displayName = 'Input'

export default Input
