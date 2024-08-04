import { useMutation } from "@apollo/client";
import { GET_TASKS_COLUMNS } from "@/6Shared/api/gql/requests/Task";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";
import { CREATE_TASK_COLUMN } from "./gql";

const useApi = () => {
  const [createTaskColumn] = useMutation<{ createTaskColumn: TasksCulumnType }>(
    CREATE_TASK_COLUMN,
    {
      update(cache, respData) {
        cache.updateQuery({ query: GET_TASKS_COLUMNS }, (data) => {
          const initialTask = { ...respData.data?.createTaskColumn, tasks: [] };
          return {
            tasksColumns: [...data.tasksColumns, initialTask],
          };
        });
      },
    }
  );
  return createTaskColumn;
};

export default useApi;
