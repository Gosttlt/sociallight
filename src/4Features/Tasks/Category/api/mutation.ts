import { useQuery } from "@apollo/client";
import { GET_TASK_CATEGORY } from "./gql";
import { TasksCategoryType } from "@/6Shared/api/types/TaskCategory";

const useApi = (id: string) => {
  const { fetchMore } = useQuery<{ taskCategories: TasksCategoryType }>(
    GET_TASK_CATEGORY,
    { variables: { id } }
  );
  return { fetchMore };
};

export default useApi;
