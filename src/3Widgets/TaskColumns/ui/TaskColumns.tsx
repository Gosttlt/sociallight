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
import {
  DndItemDataType,
  getDataOtherCard,
} from '@/6Shared/uikit/Dnd/utils/utils'

const obj = [
  {
    id: 'cm7sg0406000rf46i0ciq789m',
    name: 'Сделать',
    order: 0,
    tasks: [
      {
        id: 'cm7u0ru8t00091nisysju1lw3',
        name: 'task5',
        order: 5,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzyso600011nis8gcbaaag',
        name: 'task4',
        order: 4,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tze1840009ons1tqtp13wl',
        name: 'task3',
        order: 3,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzdz0s0007ons1qefgrjgg',
        name: 'task2',
        order: 2,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzdwf30005ons13n45m2hy',
        name: 'task1',
        order: 1,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzdsk60003ons1777zg8ig',
        name: 'Сделать ордеры тасок',
        order: 0,
        description: null,
        __typename: 'Task',
      },
    ],
    __typename: 'TaskColumn',
  },
  {
    id: 'cm7ssxlkc001yf46io6idtvvu',
    name: 'asd1',
    order: 1,
    tasks: [
      {
        id: 'cm7u4vz4i0005ckidsxh326q2',
        name: '1tasksasd5',
        order: 4,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u4vnxz0003ckidf9aysrna',
        name: '1tasksasd4',
        order: 3,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u0oh0200071niss4yizazd',
        name: '1taskasd3',
        order: 2,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u0oe5000051nisv5uryj6e',
        name: '1taskasd2',
        order: 1,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u0o7yd00031nis3fdg7zph',
        name: '1taskasd1',
        order: 0,
        description: null,
        __typename: 'Task',
      },
    ],
    __typename: 'TaskColumn',
  },
]

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

  // const setDataTaskOrders = (id: string) => {
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
  // }
  const asdFn = () => {
    const dragCard = {
      id: 'cm7tzyso600011nis8gcbaaag',
      name: 'task4',
      order: 4,
      description: null,
      __typename: 'Task',
    }
    const lastOverCard = {
      id: 'cm7u0oh0200071niss4yizazd',
      name: '1taskasd2',
      order: 2,
      description: null,
      __typename: 'Task',
    }
    const fromCards = [
      {
        id: 'cm7u0ru8t00091nisysju1lw3',
        name: 'task5',
        order: 5,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzyso600011nis8gcbaaag',
        name: 'task4',
        order: 4,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tze1840009ons1tqtp13wl',
        name: 'task3',
        order: 3,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzdz0s0007ons1qefgrjgg',
        name: 'task2',
        order: 2,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzdwf30005ons13n45m2hy',
        name: 'task1',
        order: 1,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7tzdsk60003ons1777zg8ig',
        name: 'task0',
        order: 0,
        description: null,
        __typename: 'Task',
      },
    ]
    const toCards = [
      {
        id: 'cm7u4vz4i0005ckidsxh326q2',
        name: '1tasksasd4',
        order: 4,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u4vnxz0003ckidf9aysrna',
        name: '1tasksasd3',
        order: 3,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u0oh0200071niss4yizazd',
        name: '1taskasd2',
        order: 2,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u0oe5000051nisv5uryj6e',
        name: '1taskasd1',
        order: 1,
        description: null,
        __typename: 'Task',
      },
      {
        id: 'cm7u0o7yd00031nis3fdg7zph',
        name: '1taskasd0',
        order: 0,
        description: null,
        __typename: 'Task',
      },
    ]
    const isNextPosition = false
    const asd = getDataOtherCard({
      dragCard,
      lastOverCard,
      fromCards,
      toCards,
      isNextPosition,
      reverse: true,
    })
    console.log('prev From', fromCards)
    console.log('prev to', toCards)
    console.log(asd)
  }
  return (
    <>
      <button onClick={asdFn}>asdflakf;as</button>
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
