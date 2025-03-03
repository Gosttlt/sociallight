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

const Header: HeaderComponentType = props => {
  const {email} = useAppSelector(selectUser)
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
    </header>
  )
}

export default Header
