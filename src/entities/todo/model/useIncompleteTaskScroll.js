import { useRef } from 'react'

const useIncompleteTaskScroll = (tasks) => {
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id
  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  }
}

export default useIncompleteTaskScroll

//ux logic not business logic of tasks controll(everything at same place will make combine data, interface, effects)
