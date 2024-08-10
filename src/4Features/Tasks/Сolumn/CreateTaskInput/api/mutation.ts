import { TaskVariantType } from "@/6Shared/api/types/Task";
import { useMutation } from "@apollo/client";

import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";
import { Dispatch, SetStateAction } from "react";
import {
  GET_TASKS_CATEGORIES,
  GET_TASKS_COLUMNS,
} from "@/6Shared/api/gql/requests/Task";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";

import createInputConfig from "../config";
import { GET_TASK_CATEGORY } from "@/4Features/Tasks/Category/api/gql";
import {
  TasksCategoriesResponseType,
  TasksCategoryResponseType,
} from "@/6Shared/api/types/TaskCategory";

type OptionsType = {
  cb: (id: string) => void;
  setValue: Dispatch<SetStateAction<string>>;
  variant: TaskVariantType;
  parentId?: string | null;
  activeId?: string | null;
};

const useApi = ({ cb, setValue, variant, parentId, activeId }: OptionsType) => {
  const { method, methodName } = createInputConfig[variant];

  const [create] = useMutation(method, {
    update(cache, { data }) {
      if (variant === "category") {
        cache.updateQuery({ query: GET_TASKS_CATEGORIES }, (cacheData) => {
          return {
            taskCategories: [
              ...cacheData.taskCategories,
              data?.createTaskCategory,
            ],
          };
        });
      } else {
        cache.updateQuery(
          { query: GET_TASK_CATEGORY, variables: { id: activeId } },
          (cacheData) => {
            console.log(cacheData);
            if (variant === "column") {
              const initialTask = {
                ...data?.createTaskColumn,
                tasks: [],
              };
              return {
                taskCategory: {
                  ...cacheData.taskCategory,
                  columns: [...cacheData.taskCategory.columns, initialTask],
                },
              };
            } else if (variant === "task") {
              return {
                taskCategory: {
                  ...cacheData.taskCategory,
                  columns: cacheData.taskCategory.columns.map((column: any) => {
                    if (column.id === data.createTask.columnId) {
                      return {
                        ...column,
                        tasks: [data.createTask, ...column.tasks],
                      };
                    }
                    return column;
                  }),
                },
              };
            }

            return cacheData;
          }
        );
      }

      cb(data[methodName].id);
      setValue("");
    },
  });

  return useDebaunce(create, 900);
};

export default useApi;
