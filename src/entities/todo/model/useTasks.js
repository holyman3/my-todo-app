import { useState, useRef, useCallback, useEffect, useMemo, useReducer } from 'react'
import tasksAPI from '@/shared/api/tasks'

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state
    }
    case 'ADD': {
      return [...state, action.task]
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task
      })
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id)
    }
    case 'DELETE_ALL': {
      return []
    }
    default: {
      return state
    }
  }
}

const useTasks = () => {
  //const [tasks, setTasks] = useState([]) //this code runs before the first render(UE one runs after the render)
  const [tasks, dispatch] = useReducer(tasksReducer, [])

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingTaskId, setDisappearingTaskId] = useState(null)
  const [appearingTaskId, setAppearingTaskId] = useState(null)

  const newTaskInputRef = useRef(null)
  //console.log('ref', newTaskInputRef)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('You sure to delete all the tasks')

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' }))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId)
      setTimeout(() => {
        dispatch({ type: 'DELETE', taskId })
        setDisappearingTaskId(null)
      }, 400)
    })
  }, [])

  const toggleTask = useCallback((taskId, isDone) => {
    tasksAPI.toggleIsDone(taskId, isDone).then(() => {
      dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
    })
  }, [])

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    }

    tasksAPI.add(newTask).then((addedTask) => {
      //setTasks((prevTasks) => [...prevTasks, addedTask]) //no need for setting tasks in dep arr(no call to tasks)
      dispatch({ type: 'ADD', task: addedTask })
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

    tasksAPI.getAll().then((serverTasks) => dispatch({ type: 'SET_ALL', tasks: serverTasks }))
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
