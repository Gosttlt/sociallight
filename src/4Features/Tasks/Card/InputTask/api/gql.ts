import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation UreateTask($name: String!, $id: String!) {
    updateTask(updateTaskInput: { name: $name, id: $id }) {
      id
      name
    }
  }
`;

export const UPDATE_TASK_COLUMN = gql`
  mutation UreateTaskColumn($name: String!, $id: String!) {
    updateTaskColumn(updateTaskColumnInput: { name: $name, id: $id }) {
      id
      name
    }
  }
`;
