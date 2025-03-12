import clsx from 'clsx'

import s from './User.module.scss'
import type {UserComponentType} from './User.types'

const User: UserComponentType = props => {
  const {className = '', children} = props

  return <div className={clsx(s.userWrapper, className)}>{children}</div>
}

export default User
