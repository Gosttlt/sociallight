import {useCallback, useRef} from 'react'

const useDebaunce = <K extends Function, R extends K['arguments']>(
  cb: K,
  ms: number = 300,
) => {
  const timeoutId = useRef<null | ReturnType<typeof setTimeout>>(null)

  return useCallback(
    (...args: R) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
      timeoutId.current = setTimeout(() => {
        cb(...args)
      }, ms)
    },
    [cb, ms],
  )
}

export default useDebaunce
