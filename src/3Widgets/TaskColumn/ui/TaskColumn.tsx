'use client'

import clsx from 'clsx'

import s from './TaskColumn.module.scss'
import type {TaskColumnComponentType} from './TaskColumn.types'

import TaskCard from '@/5Entities/Task/ui/TaskCard'

import Sort from '@/4Features/Tasks/Сolumn/Sort'
import Filter from '@/4Features/Tasks/Сolumn/Filter'
import RemoveCard from '@/4Features/Tasks/Card/RemoveCard'
import CreateTaskInput from '@/4Features/Tasks/Сolumn/CreateTaskInput'
import LevelSelector from '@/4Features/Tasks/Card/LevelSelector'
import EditTaskBtn from '@/4Features/Tasks/Card/EditTaskBtn'
import InputTask from '@/4Features/Tasks/Card/InputTask'

import {useHomePageStore} from '@/app/home/model'
import DndContainer from '@/6Shared/uikit/Dnd/DndContainer/DndContainer'
import DndItem from '@/6Shared/uikit/Dnd/DndItems/DndItem'
import useApi from '@/4Features/Tasks/UpdateOrder/api/mutation'
import {DndItemDataType} from '@/6Shared/uikit/Dnd/utils/utils'
import {
  UPDATE_TASK_COLUMN_ORDERS,
  UPDATE_TASK_ORDERS,
} from '@/4Features/Tasks/UpdateOrder/api/gql'
import {useMutation} from '@apollo/client'
import {GET_TASK_CATEGORY} from '@/6Shared/api/gql/requests/Task'
import {TasksCategoryType} from '@/6Shared/api/types/TaskCategory'
import {TasksCulumnType} from '@/6Shared/api/types/TaskColumn'
import {TaskType} from '@/6Shared/api/types/Task'
import {useDndStore} from '@/6Shared/uikit/Dnd/State'
import {useDndCursor} from '@/6Shared/uikit/Dnd/utils/useDndCursor'
import {useRef} from 'react'

const TaskColumn: TaskColumnComponentType = props => {
  const {data} = props
  const node = useRef<null | HTMLDivElement>(null)
  const cursor = useDndCursor(node.current)

  const focusId = useHomePageStore(state => state.focusId)
  const activeId = useHomePageStore(state => state.activeId)

  const [updateTask] = useMutation<{
    updateTaskOrders: DndItemDataType[]
  }>(UPDATE_TASK_ORDERS)

  return (
    <div style={{cursor}} ref={node} className={clsx(s.tasksWrapper)}>
      <div className={clsx(s.headWrapper, {[s.noEvent]: cursor})}>
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
      <DndContainer
        reverse
        direction='vertical'
        sharedId='taskDnd'
        items={data?.tasks}
        setData={resp => {
          const reqFromData = resp.fromCard.map(({id, order}) => ({
            id,
            order,
            columnId: resp.fromId,
          }))
          if (resp.toCard && resp.toID) {
            const reqToData = resp.toCard.map(({id, order}) => ({
              id,
              order,
              columnId: resp.toID,
            }))
            updateTask({
              variables: {tasks: [...reqFromData, ...reqToData]},
              update(cache) {
                cache.updateQuery(
                  {query: GET_TASK_CATEGORY, variables: {id: activeId}},
                  cacheData => {
                    return {
                      taskCategory: {
                        ...cacheData.taskCategory,
                        columns: cacheData.taskCategory.columns.map(
                          (column: TasksCulumnType) => {
                            if (column.id === resp.fromId) {
                              return {
                                ...column,
                                tasks: resp.fromCard,
                              }
                            }
                            if (column.id === resp.toID) {
                              return {
                                ...column,
                                tasks: resp.toCard,
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
              optimisticResponse: {
                // @ts-ignore
                updateTaskOrders: [
                  ...resp.fromCard.map(data => ({
                    ...data,
                    columnId: resp.fromId,
                    __typename: 'Task',
                  })),
                  ...resp.toCard.map(data => ({
                    ...data,
                    columnId: resp.toID,
                    __typename: 'Task',
                  })),
                ],
              },
            })
          } else {
            updateTask({
              variables: {tasks: reqFromData},
              update(cache) {
                cache.updateQuery(
                  {query: GET_TASK_CATEGORY, variables: {id: activeId}},
                  cacheData => {
                    return {
                      taskCategory: {
                        ...cacheData.taskCategory,
                        columns: cacheData.taskCategory.columns.map(
                          (column: TasksCulumnType) => {
                            if (column.id === resp.fromId) {
                              return {
                                ...column,
                                tasks: resp.fromCard,
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
              optimisticResponse: {
                // @ts-ignore
                updateTaskOrders: resp.fromCard.map(({id, order, name}) => {
                  return {
                    id,
                    order,
                    name,
                    __typename: 'Task',
                    columnId: resp.fromId,
                  }
                }),
              },
            })
          }
        }}
        containerId={data.id}
      >
        {data?.tasks &&
          data?.tasks.map((task, index) => (
            <DndItem reverse index={index} key={task.id} card={task}>
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
      </DndContainer>
    </div>
  )
}

export default TaskColumn
