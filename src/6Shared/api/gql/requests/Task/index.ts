import {gql} from '@apollo/client'

export const GET_TASKS_COLUMNS = gql`
  query GetTasksColumn {
    tasksColumns {
      id
      name
    }
  }
`

export const GET_TASKS_CATEGORIES = gql`
  query GetCategories {
    taskCategories {
      name
      id
      order
    }
  }
`
export const GET_TASK_CATEGORY = gql`
  query GetCategory($id: String!) {
    taskCategory(id: $id) {
      name
      id
      order
      columns {
        id
        name
        order
        tasks {
          id
          name
          order
          description
        }
      }
    }
  }
`
