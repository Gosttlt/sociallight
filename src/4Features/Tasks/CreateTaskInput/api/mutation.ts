import { TaskType } from "@/6Shared/types/Task";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, GET_TASKS } from "./gql";
import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";
import { Dispatch, SetStateAction } from "react";

const useApi = (
  cb: (id: string) => void,
  setValue: Dispatch<SetStateAction<string>>
) => {
  const [createTask] = useMutation<{ createTask: TaskType }>(CREATE_TASK, {
    update(cache, { data }) {
      const todos = cache.readQuery<{ tasks: TaskType[] }>({
        query: GET_TASKS,
      });
      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: [data?.createTask, ...(todos?.tasks ? todos?.tasks : [])],
        },
      });
      cb(data?.createTask.id!);
      setValue("");
    },
  });
  return useDebaunce(createTask, 900);
};

export default useApi;
