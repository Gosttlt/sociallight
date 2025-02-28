'use client'

import clsx from 'clsx'

import s from './TaskColumn.module.scss'
import type {TaskColumnComponentType, TaskColumnType} from './TaskColumn.types'

import TaskCard from '@/5Entities/Task/ui/TaskCard'

import {useContext} from 'react'
import Sort from '@/4Features/Tasks/Сolumn/Sort'
import Filter from '@/4Features/Tasks/Сolumn/Filter'
import RemoveCard from '@/4Features/Tasks/Card/RemoveCard'
import CreateTaskInput from '@/4Features/Tasks/Сolumn/CreateTaskInput'
import LevelSelector from '@/4Features/Tasks/Card/LevelSelector'
import EditTaskBtn from '@/4Features/Tasks/Card/EditTaskBtn'
import InputTask from '@/4Features/Tasks/Card/InputTask'
import {TaskContext} from '@/1Config/Providers/Task'
import Dnd from '@/6Shared/uikit/Dnd/ui/Dnd'
import DndItem from '@/6Shared/uikit/Dnd/ui/DndItem/DndItem'
import useApi from '@/4Features/Tasks/UpdateOrder/api/mutation'
import {TasksCulumnType} from '@/6Shared/api/types/TaskColumn'
import {DndContext} from '@/1Config/Providers/Dnd'
import {UPDATE_TASK_ORDERS} from '@/4Features/Tasks/UpdateOrder/api/gql'
import {TaskType} from '@/6Shared/api/types/Task'
import {GET_TASK_CATEGORY} from '@/6Shared/api/gql/requests/Task'
import {useMutation} from '@apollo/client'
import {sortDndFn} from '@/6Shared/uikit/Dnd/utils/utils'
import {TasksCategoryResponseType} from '@/6Shared/api/types/TaskCategory'

const TaskColumn: TaskColumnComponentType = props => {
  const {fromItems, dragCard, dropCard, isNextPosition} = useContext(DndContext)

  const {data} = props

  const [updateTask] = useMutation<{
    updateTaskOrders: TaskType[]
  }>(UPDATE_TASK_ORDERS, {
    update(cache) {
      const curCategory = cache.readQuery<TasksCategoryResponseType>({
        query: GET_TASK_CATEGORY,
        variables: {id: data.categoryId},
      })?.taskCategory

      const dragColumn = curCategory?.columns.find(
        column => column.id === (dragCard as TaskType).columnId,
      )
      const dropColumn = curCategory?.columns.find(
        column => column.id === (dropCard.current as TaskType).columnId,
      )

      cache.modify({
        id: cache.identify(dragColumn!),
        fields: {
          tasks(tasks) {
            return tasks.filter((task: {__ref: string}) => {
              return task.__ref !== `Task:${dragCard!.id}`
            })
          },
        },
      })
      cache.modify({
        id: cache.identify(dropColumn!),
        fields: {
          tasks(tasks) {
            return [...tasks, {__ref: `Task:${dragCard?.id}`}]
          },
        },
      })

      cache.updateQuery(
        {query: GET_TASK_CATEGORY, variables: {id: data.categoryId}},
        cacheData => {
          return {
            taskCategory: {
              ...cacheData.taskCategory,
              columns: cacheData.taskCategory.columns.map(
                (column: TasksCulumnType) => {
                  if (column.id === (dropCard.current as TaskType).columnId) {
                    return {
                      ...column,
                      tasks: column.tasks.toSorted(sortDndFn),
                    }
                  }
                  return column
                },
              ),
            },
          }
        },
      )
    },
  })
  // console.log(data.tasks);

  // const setDataFn = (newData: Array<TaskType>) => {
  //   const newFromArr = fromItems
  //     ?.filter((formItem) => formItem.id !== dragCard?.id)
  //     .map(({ id }, i) => ({ id, order: i }));

  //   const newCurCard = {
  //     ...dragCard!,
  //     order: isNextPosition
  //       ? dropCard.current!.order + 0.1
  //       : dropCard?.current!.order! - 0.1,
  //     columnId: (dropCard?.current! as TaskType).columnId,
  //   } as TaskType;

  //   newData?.push(newCurCard);
  //   const newToArr = newData.toSorted(sortDndFn).map(({ id, columnId }, i) => {
  //     if (id === dragCard?.id) {
  //       return { id, order: i, columnId };
  //     }
  //     return { id, order: i };
  //   });

  //   if (
  //     (dragCard as TaskType)?.columnId ===
  //     (dropCard.current as TaskType)?.columnId
  //   ) {
  //     updateTask({
  //       variables: {
  //         tasks: newToArr,
  //       },
  //     });
  //   } else {
  //     updateTask({
  //       variables: {
  //         tasks: [...newFromArr!, ...newToArr],
  //       },
  //     });
  //   }
  // };

  const setDataFn = () => {
    console.log(312)
  }
  const {focusId} = useContext(TaskContext)

  return (
    <div className={clsx(s.tasksWrapper)}>
      <div className={s.headWrapper}>
        <div className={s.filtersBlock}>
          <Sort />
          <Filter />
          <RemoveCard variant='column' id={data.id} />
        </div>
        <InputTask
          variant='column'
          value={data.name}
          isFocus={data.id === focusId}
          id={data.id}
        />
      </div>
      <CreateTaskInput variant='task' parentId={data.id} />
      <Dnd
        direction={{
          name: 'height',
          value: 34,
          paddingDefolt: 4,
          paddingStreach: 20,
        }}
        items={data?.tasks}
        setData={setDataFn}
        sharedClass='taskDnd'
        wrapperId={data.id}
        reverse
      >
        {data?.tasks &&
          data?.tasks.map(task => (
            <DndItem key={task.id} data={task}>
              <TaskCard
                isCreate={task.id === focusId}
                key={task.id}
                levelSelectors={[{Selector: LevelSelector, text: 'Приоритет'}]}
                EditTaskBtn={<EditTaskBtn />}
              >
                <InputTask
                  isFocus={task.id === focusId}
                  value={task.name}
                  id={task.id}
                  variant='task'
                />
                <RemoveCard variant='task' id={task.id} />
              </TaskCard>
            </DndItem>
          ))}
      </Dnd>
    </div>
  )
}

export default TaskColumn
