import {gql} from '@apollo/client'

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $columnId: String!) {
    createTask(createTaskInput: {name: $name, columnId: $columnId}) {
      id
      name
      columnId
      order
      description
    }
  }
`
export const CREATE_TASK_COLUMN = gql`
  mutation CreateTaskColumn($name: String!, $categoryId: String!) {
    createTaskColumn(
      createTaskColumnInput: {name: $name, categoryId: $categoryId}
    ) {
      id
      name
      categoryId
      order
      tasks {
        id
        name
        order
        description
      }
    }
  }
`

export const CREATE_TASK_CATEGORY = gql`
  mutation CreateTaskCategory($name: String!) {
    createTaskCategory(createTaskCategoryInput: {name: $name}) {
      id
      name
      order
    }
  }
`
