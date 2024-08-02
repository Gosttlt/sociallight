// "use client";

// import clsx from "clsx";

// import s from "./TaskColumn.module.scss";

// import Sort from "@/4Features/Tasks/Sort";
// import Filter from "@/4Features/Tasks/Filter";
// import TaskCard from "@/5Entities/Task/ui/TaskCard";
// import LevelSelector from "@/4Features/Tasks/LevelSelector";
// import EditTaskBtn from "@/4Features/Tasks/EditTaskBtn";
// import RemoveCard from "@/4Features/Tasks/RemoveCard";
// import InputTask from "@/4Features/Tasks/InputTask";
// import CreateTaskInput from "@/4Features/Tasks/CreateTaskInput";
// import { gql, useMutation, useQuery } from "@apollo/client";
// import { TaskType } from "@/6Shared/types/Task";
// import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";
// import { TaskColumnComponentType } from "./TaskColumn/ui/TaskColumn.types";

// const GET_TASKS = gql`
//   query GetTask {
//     tasksgql {
//       id
//       name
//     }
//   }
// `;
// const CREATE_TASK = gql`
//   mutation CreateTask($name: String!) {
//     createTask(name: $name) {
//       id
//       name
//     }
//   }
// `;

// const UPDATE_TASK = gql`
//   mutation UreateTask($name: String!, $id: String!) {
//     updateTask(name: $name, id: $id) {
//       id
//       name
//     }
//   }
// `;

// const DELETE_TASK = gql`
//   mutation DeleteTask($id: String!) {
//     deleteTask(id: $id) {
//       id
//     }
//   }
// `;

// const TaskColumn: TaskColumnComponentType = () => {
//   const { data, loading } = useQuery<{ tasksgql: TaskType[] }>(GET_TASKS);
//   const [createTask, { data: datata }] = useMutation<{ createTask: TaskType }>(
//     CREATE_TASK,
//     {
//       // refetchQueries: [{ query: GET_TASKS }],
//       update(cache, { data }) {
//         const todos = cache.readQuery<{ tasksgql: TaskType[] }>({
//           query: GET_TASKS,
//         });
//         cache.writeQuery({
//           query: GET_TASKS,
//           data: {
//             tasksgql: [
//               data?.createTask,
//               ...(todos?.tasksgql ? todos?.tasksgql : []),
//             ],
//           },
//         });
//       },
//     }
//   );
//   const [updateTask] = useMutation<{ createTask: TaskType }>(UPDATE_TASK, {
//     refetchQueries: [{ query: GET_TASKS }],
//   });
//   const [deleteTask] = useMutation<{ tasksgql: TaskType }>(DELETE_TASK, {
//     refetchQueries: [{ query: GET_TASKS }],
//   });

//   return (
//     <div className={clsx(s.tasksWrapper)}>
//       <div
//         onClick={() => createTask({ variables: { name: "adwadw" } })}
//         className={s.headWrapper}
//       >
//         <div>Сделать</div>
//         <div className={s.filtersBlock}>
//           <Sort />
//           <Filter />
//         </div>
//       </div>
//       <CreateTaskInput />
//       {data?.tasksgql &&
//         data?.tasksgql.map((task) => (
//           <TaskCard
//             key={task.id}
//             levelSelectors={[{ Selector: LevelSelector, text: "Приоритет" }]}
//             EditTaskBtn={<EditTaskBtn />}
//           >
//             <InputTask value={task.name} id={task.id} />
//             <RemoveCard
//               onClick={() => deleteTask({ variables: { id: task.id } })}
//             />
//           </TaskCard>
//         ))}
//     </div>
//   );
// };

// export default TaskColumn;
