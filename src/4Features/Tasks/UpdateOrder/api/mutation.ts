import { useMutation } from "@apollo/client";
import {
  UPDATE_TASK_CATEGORY_ORDERS,
  UPDATE_TASK_COLUMN_ORDERS,
  UPDATE_TASK_ORDERS,
} from "./gql";
import {
  TasksCategoriesResponseType,
  TasksCategoryType,
} from "@/6Shared/api/types/TaskCategory";
import {
  GET_TASK_CATEGORY,
  GET_TASKS_CATEGORIES,
} from "@/6Shared/api/gql/requests/Task";
import { TaskType, TaskVariantType } from "@/6Shared/api/types/Task";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";

const useApi = (
  variant: TaskVariantType,
  activeId?: string | null,
  columnId?: string
) => {
  if (variant === "column") {
    const [updateTask] = useMutation<{
      updateTaskColumnOrders: TasksCulumnType[];
    }>(UPDATE_TASK_COLUMN_ORDERS, {
      update(cache) {
        cache.updateQuery(
          { query: GET_TASK_CATEGORY, variables: { id: activeId } },
          (cacheData) => {
            return {
              taskCategory: {
                ...cacheData.taskCategory,
                columns: cacheData?.taskCategory.columns.toSorted(
                  (a: TasksCategoryType, b: TasksCategoryType) =>
                    a.order - b.order
                ),
              },
            };
          }
        );
      },
    });
    return updateTask;
  } else if (variant === "task") {
    const [updateTask] = useMutation<{
      updateTaskOrders: TaskType[];
    }>(UPDATE_TASK_ORDERS, {
      update(cache) {
        cache.updateQuery(
          { query: GET_TASK_CATEGORY, variables: { id: activeId } },
          (cacheData) => {
            return {
              taskCategory: {
                ...cacheData.taskCategory,
                columns: cacheData.taskCategory.columns.map(
                  (column: TasksCulumnType) => {
                    if (column.id === columnId) {
                      return {
                        ...column,
                        tasks: column.tasks.toSorted(
                          (a: TaskType, b: TaskType) => a.order - b.order
                        ),
                      };
                    }
                    return column;
                  }
                ),
              },
            };
          }
        );
      },
    });
    return updateTask;
  } else {
    const [updateTask] = useMutation<TasksCategoriesResponseType>(
      UPDATE_TASK_CATEGORY_ORDERS,
      {
        update(cache) {
          cache.updateQuery({ query: GET_TASKS_CATEGORIES }, (cacheData) => {
            return {
              taskCategories: cacheData?.taskCategories.toSorted(
                (a: TasksCategoryType, b: TasksCategoryType) =>
                  a.order - b.order
              ),
            };
          });
        },
      }
    );
    return updateTask;
  }
};

export default useApi;
