import Input from '@/6Shared/uikit/Input'
import s from './InputTask.module.scss'
import type {InputTaskComponentType} from './InputTask.types'
import {ChangeEvent, useEffect, useRef, useState} from 'react'
import useApi from '../api/mutation'
import {clsx} from 'clsx'
import {useDndCursor} from '@/6Shared/uikit/Dnd/utils/useDndCursor'

const InputTask: InputTaskComponentType = props => {
  const {value, id, isFocus, variant} = props
  const [localValue, setLocalValue] = useState(value)
  const ref = useRef<null | HTMLInputElement>(null)

  const debaunceFetchUpdate = useApi(variant)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
    debaunceFetchUpdate({variables: {name: e.target.value, id}})
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [isFocus])

  return (
    <Input
      value={localValue}
      ref={ref}
      className={clsx(s.inputTask, s[variant])}
      onChange={onChange}
    />
  )
}

export default InputTask
