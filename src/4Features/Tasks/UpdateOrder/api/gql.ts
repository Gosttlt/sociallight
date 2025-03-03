import {gql} from '@apollo/client'

export const UPDATE_TASK_CATEGORY_ORDERS = gql`
  mutation UpdateTaskCategoryOrders(
    $categories: [UpdateTaskCategoryOrderInput!]!
  ) {
    updateTaskCategoryOrders(updateTaskCategoryOrdersInput: $categories) {
      id
      name
      order
    }
  }
`

export const UPDATE_TASK_COLUMN_ORDERS = gql`
  mutation UpdateTaskColumnOrders($columns: [UpdateTaskColumnOrderInput!]!) {
    updateTaskColumnOrders(updateTaskColumnOrdersInput: $columns) {
      id
      name
      order
    }
  }
`

export const UPDATE_TASK_ORDERS = gql`
  mutation UpdateTaskOrders($tasks: [UpdateTaskOrderInput!]!) {
    updateTaskOrders(updateTaskOrdersInput: $tasks) {
      id
      name
      order
      columnId
    }
  }
`
