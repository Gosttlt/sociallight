'use client'
import clsx from 'clsx'
import s from './LoginForm.module.scss'

import type {LoginFormComponentType} from './LoginForm.types'
import Input from '@/6Shared/uikit/Input'
import {cache, useState} from 'react'
import Button from '@/6Shared/uikit/Button'
import {appFetch} from '@/6Shared/api/fetch'
import {ACCOUNT_ID, BASE_URL, JWT_ACCESS} from '@/6Shared/api/const'
import {GET_USER, REGISTRATION, LOGIN} from '@/5Entities/User/api'
import {useApolloClient, useMutation, useQuery} from '@apollo/client'

const LoginForm: LoginFormComponentType = props => {
  const {className = ''} = props
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setСonfirmPassword] = useState<string>('')

  const client = useApolloClient()

  const [fetchRegistration, {data}] = useMutation<{
    registration: {accessToken: string; accId: string}
  }>(REGISTRATION, {
    onCompleted(data) {
      if (data && data.registration.accessToken && data.registration.accId) {
        localStorage.setItem(JWT_ACCESS, data.registration.accessToken)
        localStorage.setItem(ACCOUNT_ID, data.registration.accId)
      }
    },
  })

  const onRegistretion = async () => {
    const accId = localStorage.getItem(ACCOUNT_ID)
    await fetchRegistration({
      variables: {
        registrationAuthGqlDto: {accId, email, password, confirmPassword},
      },
    })
    await client.query({query: GET_USER, fetchPolicy: 'network-only'})
  }

  const [fetchLogin] = useMutation<{
    login: {accessToken: string; accId: string}
  }>(LOGIN, {
    onCompleted(data) {
      if (data && data.login.accessToken && data.login.accId) {
        localStorage.setItem(JWT_ACCESS, data.login.accessToken)
        localStorage.setItem(ACCOUNT_ID, data.login.accId)
      }
    },
  })

  const onLogin = async () => {
    const accId = localStorage.getItem(ACCOUNT_ID)
    await fetchLogin({variables: {loginAuthGqlDto: {accId, email, password}}})
    await client.query({query: GET_USER, fetchPolicy: 'network-only'})
  }

  const getUser = async () => {
    try {
      const res = await appFetch('api/user')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const onExit = async () => {
    try {
      const res = await appFetch('auth/logout')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
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

  return (
    <>
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
