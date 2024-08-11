import { useMutation } from "@apollo/client";
import { DELETE_TASK, REMOVE_TASK_CATEGORY, REMOVE_TASK_COLUMN } from "./gql";
import { TaskType, TaskVariantType } from "@/6Shared/api/types/Task";
import {
  GET_TASKS_CATEGORIES,
  GET_TASK_CATEGORY,
} from "@/6Shared/api/gql/requests/Task";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";
import {
  TasksCategoriesResponseType,
  TasksCategoryResponseType,
} from "@/6Shared/api/types/TaskCategory";
import { Dispatch, SetStateAction } from "react";

const useApi = (
  variant: TaskVariantType,
  categoryId: string | null,
  cb: Dispatch<SetStateAction<string | null>>
) => {
  if (variant === "category") {
    const [remove] = useMutation(REMOVE_TASK_CATEGORY, {
      update(cache, { data }) {
        const id = data.removeTaskCategory.id;
        cache.modify({
          fields: {
            taskCategories(categories) {
              return categories.filter((category: { __ref: string }) => {
                return category.__ref !== `TaskCategory:${id}`;
              });
            },
          },
        });
        if (id === categoryId) {
          const catigories = cache.readQuery<TasksCategoriesResponseType>({
            query: GET_TASKS_CATEGORIES,
          });
          cb(catigories?.taskCategories[0].id || null);
        }
      },
    });
    return remove;
  }
  if (variant === "column") {
    const [remove] = useMutation<{
      removeTaskColumn: TasksCulumnType;
    }>(REMOVE_TASK_COLUMN, {
      update(cache, data) {
        const columnId = data.data?.removeTaskColumn.id;

        const curCategory = cache.readQuery<TasksCategoryResponseType>({
          query: GET_TASK_CATEGORY,
          variables: { id: categoryId },
        })?.taskCategory;

        cache.modify({
          id: cache.identify(curCategory!),
          fields: {
            columns(prevColumns) {
              return prevColumns.filter(
                (column: { __ref: string }) =>
                  column.__ref !== `TaskColumn:${columnId}`
              );
            },
          },
        });
      },
    });
    return remove;
  }

  const [remove] = useMutation<{ deleteTask: TaskType }>(DELETE_TASK, {
    update(cache, data) {
      const taskId = data.data?.deleteTask.id;
      const columnId = data.data?.deleteTask.columnId;
      const curCategory = cache.readQuery<TasksCategoryResponseType>({
        query: GET_TASK_CATEGORY,
        variables: { id: categoryId },
      });

      const curColumn = curCategory?.taskCategory.columns.find(
        (column) => column.id === columnId
      );

      cache.modify({
        id: cache.identify(curColumn!),
        fields: {
          tasks(tasks) {
            return tasks.filter(
              (task: { __ref: string }) => task.__ref !== `Task:${taskId}`
            );
          },
        },
      });
    },
  });
  return remove;
};

export default useApi;
