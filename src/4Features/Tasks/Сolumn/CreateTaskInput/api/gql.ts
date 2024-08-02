import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($columnId: String!, $name: String!) {
    createTask(createTaskInput: { name: $name, columnId: $columnId }) {
      id
      name
      columnId
    }
  }
`;
