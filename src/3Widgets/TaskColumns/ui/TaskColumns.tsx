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
import {DndItemDataType} from '@/6Shared/uikit/Dnd/utils/utils'

const TaskColumns: TaskColumnsComponentType = props => {
  const {className = '', children} = props
  const activeId = useHomePageStore(state => state.activeId)

  const {data} = useQuery<TasksCategoryResponseType>(GET_TASK_CATEGORY, {
    variables: {id: activeId},
  })

  const setData = useApi('column', activeId)

  const setDataFn = (fromData: DndItemDataType[]) => {
    setData({
      variables: {
        columns: fromData.map(({id, order}) => {
          return {id, order}
        }),
      },
      optimisticResponse: {
        // @ts-ignore
        updateTaskColumnOrders: fromData
          .map(({id, order, name}) => {
            return {id, order, name, __typename: 'TaskColumn'}
          })
          .toSorted(
            (a: DndItemDataType, b: DndItemDataType) => a.order - b.order,
          ),
      },
    })
  }

  return (
    <>
      <div className={clsx(s.taskColumnsWrapper, className)}>
        {data?.taskCategory && (
          <DndContainer
            direction='horizontal'
            setData={cards => {
              setDataFn(cards.fromCard)
            }}
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
