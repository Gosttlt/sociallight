import { TaskType } from "@/6Shared/api/types/Task";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "./gql";
import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";
import { Dispatch, SetStateAction } from "react";
import { GET_TASKS_COLUMNS } from "@/6Shared/api/gql/requests/Task";
import { TasksCulumnTypeResponse } from "@/6Shared/api/types/TaskColumn";

const useApi = (
  cb: (id: string) => void,
  setValue: Dispatch<SetStateAction<string>>
) => {
  const [createTask] = useMutation<{
    createTask: { id: string; name: string; columnId: string };
  }>(CREATE_TASK, {
    update(cache, { data }) {
      const curIdColumn = data?.createTask.columnId;
      const cacheState = cache.readQuery<TasksCulumnTypeResponse>({
        query: GET_TASKS_COLUMNS,
      });
      console.log(1, cacheState);

      const curColomn = cacheState?.tasksColumns.find(
        (column) => column.id === curIdColumn
      );

      console.log(2, cacheState);
      cache.writeQuery({
        query: GET_TASKS_COLUMNS,
        data: {
          tasksColumns: [...cacheState?.tasksColumns!],
        },
      });
      cb(data?.createTask.id!);
      setValue("");
    },
  });
  return useDebaunce(createTask, 900);
};

export default useApi;
