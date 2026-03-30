import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage()

  const [tasks, setTasks] = useState(
    savedTasks ?? [
      { id: 'task-1', title: 'Buy Milk', isDone: false },
      { id: 'task-2', title: 'Walk The Dog', isDone: true },
    ],
  ) //this code runs before the first render(UE one runs after the render)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)
  //console.log('ref', newTaskInputRef)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('You sure to delete all the tasks')

    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter(({ id }) => id !== taskId))
    },
    [tasks],
  )

  const toggleTask = useCallback(
    (taskId, isDone) => {
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task)))
    },
    [tasks],
  )

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks((prevTasks) => [...prevTasks, newTask]) //no need for setting tasks in dep arr(no call to tasks)
      setNewTaskTitle('')
      setSearchQuery('') //to see new item(cuz search query can interfere it)
      newTaskInputRef.current.focus()
    }

    console.log('ref', newTaskInputRef)
  }, [newTaskTitle])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
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
  }
}

export default useTasks
