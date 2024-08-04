import { gql } from "@apollo/client";

export const CREATE_TASK_COLUMN = gql`
  mutation CreateTaskColumn($name: String!) {
    createTaskColumn(createTaskColumnInput: { name: $name }) {
      id
      name
      tasks {
        id
        name
      }
    }
  }
`;
