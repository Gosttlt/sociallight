'use client'
import clsx from 'clsx'

import s from './Catigories.module.scss'
import type {CatigoriesComponentType} from './Catigories.types'
import Category from '@/4Features/Tasks/Category'
import CreateTaskInput from '@/4Features/Tasks/Сolumn/CreateTaskInput'
import {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {TasksCategoriesResponseType} from '@/6Shared/api/types/TaskCategory'
import {GET_TASKS_CATEGORIES} from '@/6Shared/api/gql/requests/Task'
import useApi from '@/4Features/Tasks/UpdateOrder/api/mutation'
import {
  DndItemDataType,
  getDataOtherCard,
} from '@/6Shared/uikit/Dnd/utils/utils'
import DndContainer from '@/6Shared/uikit/Dnd/DndContainer/DndContainer'
import DndItem from '@/6Shared/uikit/Dnd/DndItems/DndItem'
import {useHomePageStore} from '@/app/home/model'

const Catigories: CatigoriesComponentType = props => {
  const activeId = useHomePageStore(state => state.activeId)
  const setActiveId = useHomePageStore(state => state.setActiveId)
  const {data} = useQuery<TasksCategoriesResponseType>(GET_TASKS_CATEGORIES)
  const setData = useApi('category')
  const setDataFn = (fromData: DndItemDataType[]) => {
    setData({
      variables: {
        categories: fromData.map(({id, order}) => {
          return {id, order}
        }),
      },
      // @ts-ignore
      optimisticResponse: {
        updateTaskCategoryOrders: fromData
          .map(({id, order, name}) => {
            return {id, order, name, __typename: 'TaskCategory'}
          })
          .toSorted(
            (a: DndItemDataType, b: DndItemDataType) => a.order - b.order,
          ),
      },
    })
  }
  useEffect(() => {
    let curId = data?.taskCategories ? data.taskCategories[0]?.id : null

    if (activeId === null && curId) {
      setActiveId(curId)
    }
  }, [data])

  return (
    <div className={clsx(s.catigoriesWrapper)}>
      <DndContainer
        direction='horizontal'
        setData={cards => {
          setDataFn(cards.fromCard)
        }}
        items={data?.taskCategories}
        containerId='taskCategoryDnd'
        sharedId='taskCategoryDnd'
      >
        {data &&
          data.taskCategories.map((category, index) => (
            <DndItem index={index} card={category} key={category.id}>
              <Category
                onClick={() => setActiveId(category.id)}
                name={category.name}
                isActive={activeId === category.id}
                id={category.id}
              />
            </DndItem>
          ))}
      </DndContainer>
      <CreateTaskInput
        className={s.creatTaskInput}
        parentId={activeId}
        variant='category'
      />
    </div>
  )
}

export default Catigories
