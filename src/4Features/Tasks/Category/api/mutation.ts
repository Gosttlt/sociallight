import { useMutation } from "@apollo/client";
import { UPDATE_TASK_CATEGORY_ORDERS } from "./gql";
import { TasksCategoriesResponseType } from "@/6Shared/api/types/TaskCategory";

const useApi = () => {
  const [updateTask] = useMutation<TasksCategoriesResponseType>(
    UPDATE_TASK_CATEGORY_ORDERS
  );
  return updateTask;
};

export default useApi;
