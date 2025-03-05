'use client'

import clsx from 'clsx'
import s from './Header.module.scss'
import type {HeaderComponentType} from './Header.types'

import Logo from '@public/assets/svg/Logo.svg'
import Link from 'next/link'
import {useAppSelector} from '@/6Shared/hooks/reduxHooks'
import {selectUser} from '@/5Entities/Auth/model/userSelectors'
import Button from '@/6Shared/uikit/Button'
import Logout from '@/4Features/Auth/Logout'
import {useRouter} from 'next/navigation'
import Switcher from '@/6Shared/uikit/Switcher'
import {useDndStore} from '@/6Shared/uikit/Dnd/State'
import Tooltip from '@/6Shared/uikit/Tooltip'
import {ChangeEvent, useState} from 'react'

const Header: HeaderComponentType = props => {
  const {email} = useAppSelector(selectUser)
  const isDragReady = useDndStore(state => state.isDragReady)
  const setDragReady = useDndStore(state => state.setDragReady)
  const [isShowHint, setShowHint] = useState<boolean>(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (isShowHint) {
      setShowHint(false)
    }
    setDragReady(e.target.checked)
  }
  const {className = ''} = props
  const navigate = useRouter()

  return (
    <header className={clsx(s.headerWrapper, className)}>
      <Link className={s.logo} href='/'>
        <h2 className={s.logo} style={{color: '#4d5156'}}>
          Social Light
        </h2>

        {/* <Logo /> */}
      </Link>
      <div className={s.rightBlock}>
        <Tooltip
          text='Для претаскивания элементов, зажмите ALT или включитье режим переноса'
          direction='bottom'
          isShow={isShowHint}
        >
          <Switcher checked={isDragReady} onChange={onChangeHandler} />
        </Tooltip>
        {email ? (
          <div className={s.userInfoWrapper}>
            <div>{email}</div>
            <Logout />
          </div>
        ) : (
          <div style={{display: 'flex', gap: '12px'}}>
            <div
              style={{marginRight: '12px', cursor: 'pointer'}}
              onClick={() => navigate.push('/login')}
            >
              Зарегистрироваться
            </div>
            <div
              style={{cursor: 'pointer'}}
              onClick={() => navigate.push('/login')}
            >
              Войти
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
