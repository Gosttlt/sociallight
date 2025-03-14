import {gql} from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      accounts {
        id
        accessToken
      }
    }
  }
`

export const GET_USER = gql`
  query User {
    user {
      id
      email
      name
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

export const LOGIN = gql`
  mutation Login($loginAuthGqlDto: LoginAuthGqlDto!) {
    login(loginAuthGqlDto: $loginAuthGqlDto) {
      accessToken
      accId
    }
  }
`
export const REGISTRATION = gql`
  mutation Registration($registrationAuthGqlDto: RegistrationAuthGqlDto!) {
    registration(registrationAuthGqlDto: $registrationAuthGqlDto) {
      accessToken
      accId
    }
  }
`
