import { useMutation } from "@apollo/client";
import { DELETE_TASK, REMOVE_TASK_COLUMN } from "./gql";
import { TaskType } from "@/6Shared/api/types/Task";
import { GET_TASKS_COLUMNS } from "@/6Shared/api/gql/requests/Task";
import {
  TasksCulumnType,
  TasksCulumnTypeResponse,
} from "@/6Shared/api/types/TaskColumn";
import { TaskVariantType } from "../ui/RemoveCard.types";

const useApi = (variant: TaskVariantType) => {
  if (variant === "column") {
    const [removeTaskColumn] = useMutation<{
      removeTaskColumn: TasksCulumnType;
    }>(REMOVE_TASK_COLUMN, {
      update(cache, data) {
        const columnId = data.data?.removeTaskColumn.id;

        cache.modify({
          fields: {
            tasksColumns(prevColumn) {
              return prevColumn.filter(
                (column: { __ref: string }) =>
                  column.__ref !== `TaskColumn:${columnId}`
              );
            },
          },
        });
      },
    });
    return removeTaskColumn;
  }
  const [deleteTask] = useMutation<{ deleteTask: TaskType }>(DELETE_TASK, {
    update(cache, data) {
      const taskId = data.data?.deleteTask.id;
      const columnId = data.data?.deleteTask.columnId;

      const curColumn = cache
        .readQuery<TasksCulumnTypeResponse>({
          query: GET_TASKS_COLUMNS,
        })
        ?.tasksColumns.find((column) => column.id === columnId);

      cache.modify({
        id: cache.identify(curColumn!),
        fields: {
          tasks(curColumnTasks) {
            console.log(curColumn);
            return curColumnTasks.filter(
              (task: { __ref: string }) => task.__ref !== `Task:${taskId}`
            );
          },
        },
      });
    },
  });

  return deleteTask;
};

export default useApi;
