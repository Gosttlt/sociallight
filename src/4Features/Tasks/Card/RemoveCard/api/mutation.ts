import { useMutation } from "@apollo/client";
import { DELETE_TASK, GET_TASKS } from "./gql";
import { TaskType } from "@/6Shared/types/Task";

const useApi = (id: string) => {
  const [deleteTask] = useMutation<{ deleteTask: TaskType }>(DELETE_TASK, {
    update(cache) {
      cache.modify({
        fields: {
          tasks(tasks = []) {
            return tasks.filter(
              (ref: { __ref: string }) => ref.__ref !== `TaskModel:${id}`
            );
          },
        },
      });
    },
  });

  return deleteTask;
};

export default useApi;
