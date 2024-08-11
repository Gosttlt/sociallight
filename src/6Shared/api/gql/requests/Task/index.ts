import { gql } from "@apollo/client";

export const GET_TASKS_COLUMNS = gql`
  query GetTasksColumn {
    tasksColumns {
      id
      name
      tasks {
        name
        id
      }
    }
  }
`;

export const GET_TASKS_CATEGORIES = gql`
  query GetCategories {
    taskCategories {
      name
      id
    }
  }
`;
export const GET_TASK_CATEGORY = gql`
  query GetCategory($id: String!) {
    taskCategory(id: $id) {
      name
      id
      columns {
        id
        name
        categoryId
        tasks {
          id
          columnId
          name
        }
      }
    }
  }
`;
