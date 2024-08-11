import clsx from "clsx";

import s from "./TaskColumns.module.scss";
import { TaskColumnsComponentType } from "./TaskColumns.types";
import { useQuery } from "@apollo/client";
import { TasksCategoryResponseType } from "@/6Shared/api/types/TaskCategory";
import { useContext } from "react";
import { TaskContext } from "@/1Config/Providers/Task";
import TaskColumn from "@/3Widgets/TaskColumn/ui/TaskColumn";
import CreateTaskInput from "@/4Features/Tasks/Сolumn/CreateTaskInput";
import { GET_TASK_CATEGORY } from "@/6Shared/api/gql/requests/Task";

const TaskColumns: TaskColumnsComponentType = (props) => {
  const { className = "", children } = props;
  const { activeId } = useContext(TaskContext);
  const { data } = useQuery<TasksCategoryResponseType>(GET_TASK_CATEGORY, {
    variables: { id: activeId },
  });

  return (
    <div className={clsx(s.taskColumnsWrapper, className)}>
      {data &&
        data?.taskCategory.columns.map((column) => (
          <TaskColumn key={column.id} data={column} />
        ))}
      <CreateTaskInput parentId={data?.taskCategory.id} variant="column" />
    </div>
  );
};

export default TaskColumns;
