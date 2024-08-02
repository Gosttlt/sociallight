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
