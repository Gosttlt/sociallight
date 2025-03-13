'use client'
import clsx from 'clsx'
import s from './LoginForm.module.scss'

import type {LoginFormComponentType} from './LoginForm.types'
import Input from '@/6Shared/uikit/Input'
import {useState} from 'react'
import Button from '@/6Shared/uikit/Button'
import {appFetch} from '@/6Shared/api/fetch'
import {ACCOUNT_ID, BASE_URL, JWT_ACCESS} from '@/6Shared/api/const'
import {GET_USERS} from '@/5Entities/User/api'
import {useQuery} from '@apollo/client'

const LoginForm: LoginFormComponentType = props => {
  const {className = ''} = props
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setСonfirmPassword] = useState<string>('')

  const onRegistretion = async () => {
    const accId = localStorage.getItem(ACCOUNT_ID)
    const res = await appFetch('auth/registration', {
      method: 'POST',

      body: {email, password, confirmPassword, accId},
    })
    if (res.accessToken && res.accId) {
      localStorage.setItem(JWT_ACCESS, res.accessToken)
      localStorage.setItem(ACCOUNT_ID, res.accId)
    }
  }

  const onLogin = async () => {
    const accId = localStorage.getItem(ACCOUNT_ID)
    const res = await appFetch('auth/login', {
      method: 'POST',
      body: {email, password, accId},
    })
    if (res.accessToken && res.accId) {
      localStorage.setItem(JWT_ACCESS, res.accessToken)
      localStorage.setItem(ACCOUNT_ID, res.accId)
    }
  }

  const getUser = async () => {
    try {
      const res = await appFetch('api/user')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const onExit = () => {
    localStorage.removeItem(JWT_ACCESS)
  }

  const onRefresh = async () => {
    let refreshResp
    const accId = localStorage.getItem(ACCOUNT_ID)
    const refreshRespJson = await fetch(BASE_URL + 'auth/refresh', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({accId}),
    })

    if (refreshRespJson) {
      refreshResp = await refreshRespJson.json()
    }

    if (refreshResp.accessToken) {
      localStorage.setItem(JWT_ACCESS, refreshResp.accessToken)
    }
  }

  const {data} = useQuery<{
    users: Array<{id: string; email: string; name: string | null}>
  }>(GET_USERS)
  console.log(data)

  return (
    <>
      <div>
        {data &&
          data.users.map(el => {
            return (
              <div key={el.id}>
                <div>id:{el.id}</div>
                <div>email:{el.email}</div>
              </div>
            )
          })}
      </div>
      <div className={clsx(s.loginFormWrapper, className)}>
        <Input
          value={email}
          className={s.input}
          type='email'
          propTitle='Email'
          onChange={e => setEmail(e.target.value)}
          placeholder='Введите Email'
        />
        <Input
          propTitle='Пароль'
          className={s.input}
          value={password}
          type='text'
          onChange={e => setPassword(e.target.value)}
          placeholder='Введите пароль'
        />
        <Input
          propTitle='Повторите пароль'
          className={s.input}
          value={confirmPassword}
          type='text'
          onChange={e => setСonfirmPassword(e.target.value)}
          placeholder='Повторите пароль'
        />
        <div className={s.buttons}>
          <Button onClick={onRegistretion}>Регистрация</Button>
          <Button onClick={onLogin}>Вход</Button>
          <Button onClick={getUser}>getUser</Button>
          <Button onClick={onExit}>exit</Button>
          <Button onClick={onRefresh}>Refresh</Button>
        </div>
      </div>
    </>
  )
}

export default LoginForm
