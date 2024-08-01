import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTask {
    tasks {
      id
      name
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!) {
    createTask(name: $name) {
      id
      name
    }
  }
`;
