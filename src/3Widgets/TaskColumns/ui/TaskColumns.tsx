import clsx from 'clsx'

import s from './TaskColumns.module.scss'
import {TaskColumnsComponentType} from './TaskColumns.types'
import {useMutation, useQuery} from '@apollo/client'
import {TasksCategoryResponseType} from '@/6Shared/api/types/TaskCategory'
import {useContext} from 'react'
import TaskColumn from '@/3Widgets/TaskColumn/ui/TaskColumn'
import CreateTaskInput from '@/4Features/Tasks/Сolumn/CreateTaskInput'
import {GET_TASK_CATEGORY} from '@/6Shared/api/gql/requests/Task'
import useApi from '@/4Features/Tasks/UpdateOrder/api/mutation'
import {TasksCulumnType} from '@/6Shared/api/types/TaskColumn'
import {TaskType} from '@/6Shared/api/types/Task'
import {UPDATE_TASK_ORDERS} from '@/4Features/Tasks/UpdateOrder/api/gql'
import {useHomePageStore} from '@/app/home/model'
import DndContainer from '@/6Shared/uikit/Dnd/DndContainer/DndContainer'
import DndItem from '@/6Shared/uikit/Dnd/DndItems/DndItem'
// import { data } from "./data";

const TaskColumns: TaskColumnsComponentType = props => {
  const {className = '', children} = props
  const activeId = useHomePageStore(state => state.activeId)

  const {data} = useQuery<TasksCategoryResponseType>(GET_TASK_CATEGORY, {
    variables: {id: activeId},
  })

  const setData = useApi('column', activeId)

  const setDataFn = (newData: Array<Partial<TasksCulumnType>>) => {
    // setData({
    //   variables: {
    //     columns: newData.map(({ id, order }) => {
    //       return { id, order };
    //     }),
    //   },
    // });
  }

  // const [updateTask] = useMutation<{
  //   updateTaskOrders: TaskType[]
  // }>(UPDATE_TASK_ORDERS, {
  //   update(cache, {data}) {
  //     cache.updateQuery(
  //       {query: GET_TASK_CATEGORY, variables: {id: activeId}},
  //       cacheData => {
  //         return {
  //           taskCategory: {
  //             ...cacheData.taskCategory,
  //             columns: cacheData.taskCategory.columns.map(
  //               (column: TasksCulumnType) => {
  //                 if (column.id === (dragCard as TaskType).columnId) {
  //                   return {
  //                     ...column,
  //                     tasks: data?.updateTaskOrders,
  //                   }
  //                 }
  //                 return column
  //               },
  //             ),
  //           },
  //         }
  //       },
  //     )
  //   },
  // })

  const setDataTaskOrders = (id: string) => {
    // let curCard = dragCard as TaskType;
    // if (curCard.columnId === id && fromItems) {
    //   const filterItems = fromItems.filter((item) => item.id !== curCard.id);
    //   const newItems = filterItems?.reduce((acc, prev, i) => {
    //     acc.push({ id: prev.id, order: i + 1 });
    //     return acc;
    //   }, [] as DndItemDataType[]);
    //   if (newItems) {
    //     const newCurCard = { id: curCard.id, order: 0 };
    //     newItems.push(newCurCard);
    //     updateTask({
    //       variables: {
    //         tasks: newItems,
    //       },
    //     });
    //   }
    // } else if (id !== curCard.columnId) {
    // }
  }

  return (
    <>
      <div className={clsx(s.taskColumnsWrapper, className)}>
        {data?.taskCategory && (
          <DndContainer
            direction='horizontal'
            setData={
              () => {}
              // asd => setDataFn(asd.fromCard)
            }
            items={data.taskCategory.columns}
            containerId='taskCategoryDnd'
            sharedId='taskColumnsDnd'
          >
            {data.taskCategory.columns.map((column, index) => (
              <DndItem index={index} card={column} key={column.id}>
                <TaskColumn key={column.id} data={column} />
              </DndItem>
            ))}
          </DndContainer>
        )}
        <CreateTaskInput
          className={s.creatTaskInput}
          parentId={data?.taskCategory.id}
          variant='column'
        />
      </div>
    </>
  )
}

export default TaskColumns
