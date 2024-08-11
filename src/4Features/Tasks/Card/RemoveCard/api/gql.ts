import { gql } from "@apollo/client";

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
      columnId
    }
  }
`;

export const REMOVE_TASK_COLUMN = gql`
  mutation RemoveTaskColumn($id: String!) {
    removeTaskColumn(id: $id) {
      id
    }
  }
`;

export const REMOVE_TASK_CATEGORY = gql`
  mutation RemoveTaskCategory($id: String!) {
    removeTaskCategory(id: $id) {
      id
    }
  }
`;
