import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation UreateTask($name: String!, $id: String!) {
    updateTask(updateTaskInput: { name: $name, id: $id }) {
      id
      name
    }
  }
`;
