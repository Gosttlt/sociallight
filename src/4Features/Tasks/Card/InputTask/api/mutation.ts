import { TaskType } from "@/6Shared/api/types/Task";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "./gql";
import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";

const useApi = () => {
  const [updateTask] = useMutation<{ updateTask: TaskType }>(UPDATE_TASK);

  return useDebaunce(updateTask);
};

export default useApi;
