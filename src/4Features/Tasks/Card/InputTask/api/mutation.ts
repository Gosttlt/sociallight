import { TaskType, TaskVariantType } from "@/6Shared/api/types/Task";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK, UPDATE_TASK_COLUMN } from "./gql";
import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";

const useApi = (variant: TaskVariantType) => {
  if (variant === "column") {
    const [update] = useMutation<{ updateTaskColumn: TasksCulumnType }>(
      UPDATE_TASK_COLUMN
    );
    return useDebaunce(update);
  } else {
    const [updateTask] = useMutation<{ updateTask: TaskType }>(UPDATE_TASK);
    return useDebaunce(updateTask);
  }
};

export default useApi;
