import { useMutation } from "@apollo/client";
import { UPDATE_TASK_CATEGORY_ORDERS } from "./gql";
import {
  TasksCategoriesResponseType,
  TasksCategoryType,
} from "@/6Shared/api/types/TaskCategory";
import { GET_TASKS_CATEGORIES } from "@/6Shared/api/gql/requests/Task";

const useApi = () => {
  const [updateTask] = useMutation<TasksCategoriesResponseType>(
    UPDATE_TASK_CATEGORY_ORDERS,
    {
      update(cache) {
        cache.updateQuery({ query: GET_TASKS_CATEGORIES }, (cacheData) => {
          return {
            taskCategories: cacheData?.taskCategories.toSorted(
              (a: TasksCategoryType, b: TasksCategoryType) => a.order - b.order
            ),
          };
        });
      },
    }
  );
  return updateTask;
};

export default useApi;
