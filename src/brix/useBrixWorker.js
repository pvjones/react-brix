import { useContext } from 'react'
import { useBrix } from './useBrix'
import { useWorker } from './useWorker'
import { BrixContext } from './BrixProvider'

export const useBrixWorker = (path, worker, notSetValue) => {
  const { value, set } = useBrix(path)
  if (value === undefined) {

    const getState = () => {
      const { state } = useContext(BrixContext)
      return state
    }

    const result = useWorker(path, () => worker(getState))
    set(result)

    return {
      value: notSetValue,
    }
  }
  return { value }
}
