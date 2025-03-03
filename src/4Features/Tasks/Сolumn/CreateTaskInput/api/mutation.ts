import {TaskVariantType} from '@/6Shared/api/types/Task'
import {useMutation} from '@apollo/client'

import useDebaunce from '@/6Shared/hooks/uiHooks/useDebaunce'
import {Dispatch, SetStateAction} from 'react'
import {
  GET_TASK_CATEGORY,
  GET_TASKS_CATEGORIES,
} from '@/6Shared/api/gql/requests/Task'

import createInputConfig from '../config'

type OptionsType = {
  cb: (id: string) => void
  setValue: Dispatch<SetStateAction<string>>
  variant: TaskVariantType
  activeId?: string | null
  parentId?: string | null
}

const useApi = ({cb, setValue, variant, activeId, parentId}: OptionsType) => {
  const {method, methodName} = createInputConfig[variant]

  const [create] = useMutation(method, {
    update(cache, {data}) {
      if (variant === 'category') {
        cache.updateQuery({query: GET_TASKS_CATEGORIES}, cacheData => {
          return {
            taskCategories: [
              ...cacheData.taskCategories,
              data?.createTaskCategory,
            ],
          }
        })
        cb(data[methodName].id)
      }
      //
      else {
        cache.updateQuery(
          {query: GET_TASK_CATEGORY, variables: {id: activeId}},
          cacheData => {
            if (variant === 'column') {
              const initialTask = {
                ...data?.createTaskColumn,
                tasks: [],
              }
              return {
                taskCategory: {
                  ...cacheData.taskCategory,
                  columns: [...cacheData.taskCategory.columns, initialTask],
                },
              }
            }
            //
            else if (variant === 'task') {
              return {
                taskCategory: {
                  ...cacheData.taskCategory,
                  columns: cacheData.taskCategory.columns.map((column: any) => {
                    if (column.id === data.createTask.columnId) {
                      return {
                        ...column,
                        tasks: [data.createTask, ...column.tasks],
                      }
                    }
                    return column
                  }),
                },
              }
            }

            return cacheData
          },
        )
      }

      setValue('')
    },
  })

  return useDebaunce(create, 900)
}

export default useApi
