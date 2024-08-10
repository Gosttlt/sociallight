import clsx from "clsx";

import s from "./TaskColumns.module.scss";
import { TaskColumnsComponentType } from "./TaskColumns.types";
import { useQuery } from "@apollo/client";
import { TasksCategoryResponseType } from "@/6Shared/api/types/TaskCategory";
import { GET_TASK_CATEGORY } from "@/4Features/Tasks/Category/api/gql";
import { useContext } from "react";
import { TaskContext } from "@/1Config/Providers/Task";
import TaskColumn from "@/3Widgets/TaskColumn/ui/TaskColumn";

const TaskColumns: TaskColumnsComponentType = (props) => {
  const { className = "", children } = props;
  const { activeId, focusId, setFocusId } = useContext(TaskContext);
  const { data } = useQuery<TasksCategoryResponseType>(GET_TASK_CATEGORY, {
    variables: { id: activeId },
  });

  return (
    <div className={clsx(s.taskColumnsWrapper, className)}>
      <div style={{ display: "flex", gap: "20px" }}>
        {data &&
          data?.taskCategory.columns.map((column) => (
            <TaskColumn
              activeId={activeId}
              focusId={focusId}
              onChangeFocus={setFocusId}
              key={column.id}
              data={column}
            />
          ))}
        <CreateTaskInput
          parentId={data?.taskCategory.id}
          onChangeFocus={setFocusId}
          variant="column"
        />
      </div>
    </div>
  );
};

export default TaskColumns;
