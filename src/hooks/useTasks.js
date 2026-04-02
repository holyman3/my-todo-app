import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import tasksAPI from '../api/tasksApi'

const useTasks = () => {
  const [tasks, setTasks] = useState([]) //this code runs before the first render(UE one runs after the render)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingTaskId, setDisappearingTaskId] = useState(null)
  const [appearingTaskId, setAppearingTaskId] = useState(null)

  const newTaskInputRef = useRef(null)
  //console.log('ref', newTaskInputRef)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('You sure to delete all the tasks')

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => setTasks([]))
    }
  }, [tasks])

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setDisappearingTaskId(taskId)
        setTimeout(() => {
          setTasks(tasks.filter(({ id }) => id !== taskId))
          setDisappearingTaskId(null)
        }, 400)
      })
    },
    [tasks],
  )

  const toggleTask = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleIsDone(taskId, isDone).then(() => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task)))
      })
    },
    [tasks],
  )

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    }

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]) //no need for setting tasks in dep arr(no call to tasks)
      setNewTaskTitle('')
      setSearchQuery('') //to see new item(cuz search query can interfere it)
      newTaskInputRef.current.focus()
      setAppearingTaskId(addedTask.id)
      setTimeout(() => {
        setAppearingTaskId(null)
      }, 400)
    })

    console.log('ref', newTaskInputRef)
  }, [])

  useEffect(() => {
    newTaskInputRef.current.focus()

    tasksAPI.getAll().then(setTasks)
  }, [])

  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return normalizedQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(normalizedQuery))
      : null
  }, [searchQuery, tasks])

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTask,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  }
}

export default useTasks
