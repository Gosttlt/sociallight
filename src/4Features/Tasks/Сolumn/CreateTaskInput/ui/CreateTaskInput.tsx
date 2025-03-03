import clsx from 'clsx'

import s from './CreateTaskInput.module.scss'
import {CreateTaskInputComponentType} from './CreateTaskInput.types'
import Input from '@/6Shared/uikit/Input'
import {ChangeEvent, useState} from 'react'
import createInputConfig from '../config'
import useApi from '../api/mutation'
import {useHomePageStore} from '@/app/home/model'

const CreateTaskInput: CreateTaskInputComponentType = props => {
  const {className = '', variant, parentId} = props
  const {parentName, placeholder} = createInputConfig[variant]

  const activeId = useHomePageStore(state => state.activeId)
  const setActiveId = useHomePageStore(state => state.setActiveId)

  const [value, setValue] = useState('')
  const [isFocus, setFocus] = useState(false)

  const create = useApi({
    cb: setActiveId,
    setValue,
    variant,
    activeId,
    parentId,
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    create({variables: {name: e.target.value, [parentName]: parentId}})
  }

  return (
    <Input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={value}
      onChange={onChange}
      className={clsx(s.createTaskInputWrapper, s[variant], className)}
      placeholder={isFocus ? '' : placeholder}
    />
  )
}

export default CreateTaskInput
