import { gql } from "@apollo/client";

export const UPDATE_TASK_CATEGORY_ORDERS = gql`
  mutation UpdateTaskCategoryOrders(
    $categories: [UpdateTaskCategoryOrderInput!]!
  ) {
    updateTaskCategoryOrders(updateTaskCategoryOrdersInput: $categories) {
      id
      name
      order
    }
  }
`;
