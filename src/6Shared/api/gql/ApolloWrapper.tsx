'use client'

import {ApolloLink, HttpLink, Operation, QueryOptions} from '@apollo/client'
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'
import {ACCOUNT_ID, BASE_URL, JWT_ACCESS} from '../const'

import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'

const onRefresh = async (
  operations: Operation[],
  client: any,
  setting: {isCollRefresh: boolean},
) => {
  try {
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
    if (refreshRespJson.status === 401) {
      setting.isCollRefresh = true
      return
    }
    if (refreshRespJson.status === 201) {
      setting.isCollRefresh = false
    }
    operations.forEach(operation => {
      client.query(operation)
    })
    operations = []
  } catch (error) {
    setting.isCollRefresh = true
  }
}

function makeClient() {
  let setting = {isCollRefresh: false}
  const opena: Operation[] = []
  const formatDateLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      if (
        response.errors &&
        response.errors[0].message === 'Unauthorized' &&
        !setting.isCollRefresh
      ) {
        opena.push(operation)
      }
      return response
    })
  })

  const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('TVOACT')

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  console.log(setting)

  const errorLink = onError(({graphQLErrors}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({message}) => {
        if (message === 'Unauthorized' && !setting.isCollRefresh) {
          onRefresh(opena, client, setting)
        }
      })
    }
  })

  const httpLink = new HttpLink({
    uri: `${BASE_URL}graphql`,
    fetchOptions: {cache: 'no-store'},
    credentials: 'include',
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: formatDateLink.concat(errorLink.concat(authLink.concat(httpLink))),
  })

  return client
}

export function ApolloWrapper({children}: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
