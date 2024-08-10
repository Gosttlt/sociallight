import { gql } from "@apollo/client";

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
