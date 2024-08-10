import { DocumentNode } from "graphql";

import {
  CREATE_TASK,
  CREATE_TASK_CATEGORY,
  CREATE_TASK_COLUMN,
} from "@/4Features/Tasks/Сolumn/CreateTaskInput/api/gql";
import { TaskVariantType } from "@/6Shared/api/types/Task";

type ConfigCreateInputType = {
  placeholder: string;
  parentName: string;
  method: DocumentNode;
  methodName: string;
};

const createInputConfig: Record<TaskVariantType, ConfigCreateInputType> = {
  category: {
    placeholder: "...Новая категория",
    parentName: "categoryId",
    method: CREATE_TASK_CATEGORY,
    methodName: "createTaskCategory",
  },
  column: {
    placeholder: "...Новый столбец",
    parentName: "categoryId",
    method: CREATE_TASK_COLUMN,
    methodName: "createTaskColumn",
  },
  task: {
    placeholder: "...Новая задача",
    parentName: "columnId",
    method: CREATE_TASK,
    methodName: "createTask",
  },
};

export default createInputConfig;
