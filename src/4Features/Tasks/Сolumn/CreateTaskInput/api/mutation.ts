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
      const columns = cache.readQuery<TasksCulumnTypeResponse>({
        query: GET_TASKS_COLUMNS,
      });

      cache.writeQuery({
        query: GET_TASKS_COLUMNS,
        data: {
          tasksColumns: columns?.tasksColumns.map((el) => {
            if (el.id === data?.createTask.columnId) {
              return { ...el, tasks: [data?.createTask!, ...el.tasks] };
            }

            return el;
          }),
        },
      });

      cb(data?.createTask.id!);
      setValue("");
    },
  });
  return useDebaunce(createTask, 900);
};

export default useApi;
