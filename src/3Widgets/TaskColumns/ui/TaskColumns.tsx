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
import Dnd from "@/6Shared/uikit/Dnd/ui/Dnd";
import DndItem from "@/6Shared/uikit/Dnd/ui/DndItem/DndItem";
import useApi from "@/4Features/Tasks/UpdateOrder/api/mutation";
import { TasksCulumnType } from "@/6Shared/api/types/TaskColumn";
import DndContextProvider from "@/1Config/Providers/Dnd";

const TaskColumns: TaskColumnsComponentType = (props) => {
  const { className = "", children } = props;
  const { activeId } = useContext(TaskContext);
  const { data } = useQuery<TasksCategoryResponseType>(GET_TASK_CATEGORY, {
    variables: { id: activeId },
  });
  const setData = useApi("column", activeId);

  const setDataFn = (newData: Array<Partial<TasksCulumnType>>) => {
    setData({
      variables: {
        columns: newData.map(({ id, order }) => {
          return { id, order };
        }),
      },
    });
  };
  return (
    <DndContextProvider>
      <div className={clsx(s.taskColumnsWrapper, className)}>
        <Dnd
          direction={{
            name: "width",
            value: 404,
            paddingDefolt: 10,
            paddingStreach: 60,
          }}
          items={data?.taskCategory.columns}
          setData={setDataFn}
          sharedClass="taskColumnsDnd"
        >
          {data &&
            data.taskCategory.columns.map((column) => (
              <DndItem
                data={{ id: column.id, order: column.order }}
                key={column.id}
              >
                <TaskColumn key={column.id} data={column} />
              </DndItem>
            ))}
        </Dnd>
        <CreateTaskInput
          className={s.creatTaskInput}
          parentId={data?.taskCategory.id}
          variant="column"
        />
      </div>
    </DndContextProvider>
  );
};

export default TaskColumns;
