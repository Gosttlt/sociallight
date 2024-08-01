import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTask {
    tasks {
      id
      name
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UreateTask($name: String, $id: String!) {
    updateTask(name: $name, id: $id) {
      id
      name
    }
  }
`;
