//best practice in new file, easy to reuse, not relying on concreate C realization
import { createContext, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import useTasks from '../hooks/useTasks'
import useIncompleteTaskScroll from '../hooks/useIncompleteTaskScroll'

export const TasksContext = createContext({})

export const TasksProvider = ({ children }) => {
  const {
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
  } = useTasks()

  const { firstIncompleteTaskRef, firstIncompleteTaskId } = useIncompleteTaskScroll(tasks)

  return (
    <TasksContext
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTask,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
      }}>
      {children}
    </TasksContext>
  )
}
