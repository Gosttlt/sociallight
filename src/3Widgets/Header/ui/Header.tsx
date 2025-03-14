'use client'

import clsx from 'clsx'
import s from './Header.module.scss'
import type {HeaderComponentType} from './Header.types'

import Link from 'next/link'

import {useRouter} from 'next/navigation'
import Switcher from '@/6Shared/uikit/Switcher'
import {useDndStore} from '@/6Shared/uikit/Dnd/State'
import Tooltip from '@/6Shared/uikit/Tooltip'
import {ChangeEvent, useState} from 'react'
import {useApolloClient, useMutation, useQuery} from '@apollo/client'
import {GET_USER, LOGOUT} from '@/5Entities/User/api'
import {JWT_ACCESS} from '@/6Shared/api/const'

const Header: HeaderComponentType = props => {
  const isDragReady = useDndStore(state => state.isDragReady)
  const setDragReady = useDndStore(state => state.setDragReady)
  const [isShowHint, setShowHint] = useState<boolean>(false)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (isShowHint) {
      setShowHint(false)
    }
    setDragReady(e.target.checked)
  }
  const {className = ''} = props
  const navigate = useRouter()
  const client = useApolloClient()

  const {data} = useQuery<{
    user: {id: string; email: string; name: string | null}
  }>(GET_USER)

  const [mutateFunction] = useMutation(LOGOUT, {
    onCompleted() {
      client.cache.modify({
        fields: {
          user(user) {
            console.log(user)
            return null
          },
        },
      })
    },
  })

  const onExit = async () => {
    try {
      mutateFunction()
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem(JWT_ACCESS)
  }

  return (
    <header className={clsx(s.headerWrapper, className)}>
      <Link className={s.logo} href='/'>
        <h2 className={s.logo} style={{color: '#4d5156'}}>
          Social Light
        </h2>
      </Link>
      <div className={s.rightBlock}>
        <Tooltip
          text='Для претаскивания элементов, зажмите ALT или включитье режим переноса'
          direction='bottom'
          isShow={isShowHint}
        >
          <Switcher checked={isDragReady} onChange={onChangeHandler} />
        </Tooltip>
        <div style={{display: 'flex', gap: '12px'}}>
          {data && data.user ? (
            <div className={s.userInfoWrapper}>
              <div>{data.user.email}</div>
              <div style={{cursor: 'pointer'}} onClick={onExit}>
                Выйти
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
