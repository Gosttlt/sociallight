import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTask {
    tasks {
      id
      name
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
