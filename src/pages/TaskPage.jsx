import React from 'react'
import { useState, useEffect } from 'react'
import tasksAPI from '../api/tasksApi'

const TaskPage = ({ params }) => {
  const taskId = params.id

  const [task, setTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData)
        setHasError(false)
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (hasError) {
    return <div>Task Not Found</div>
  }

  return (
    <>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Task Is Done' : 'Task Is Not Done'}</p>
    </>
  )
}

export default TaskPage
