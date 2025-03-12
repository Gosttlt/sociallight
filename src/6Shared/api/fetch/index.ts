import {ACCOUNT_ID, BASE_URL, JWT_ACCESS} from '../const'

export const appFetch = async (
  url: string | URL | globalThis.Request,
  init?: {
    method?: string
    credentials?: 'include' | 'omit' | 'same-origin'
    body?: any
  },
) => {
  let resp
  try {
    const accessToken = localStorage.getItem(JWT_ACCESS)
    const respJson = await fetch(BASE_URL + url, {
      ...init,
      credentials: init?.credentials ? init?.credentials : 'include',
      method: init?.method || 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(init?.body),
    })
    if (respJson) {
      resp = await respJson.json()
    }
    if (respJson.status === 401) {
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

      const accessToken = localStorage.getItem(JWT_ACCESS)
      const respJson = await fetch(BASE_URL + url, {
        ...init,
        credentials: init?.credentials ? init?.credentials : 'include',
        method: init?.method || 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(init?.body),
      })
      if (respJson) {
        resp = await respJson.json()
      }
    }
  } catch (error) {
    throw error
  }
  return resp
}
