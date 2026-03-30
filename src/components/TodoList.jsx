import React from 'react'
import TodoItem from './TodoItem'
import { memo } from 'react'
import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext.jsx'

const TodoList = () => {
  console.log('TodoList')

  const { tasks = [], filteredTasks } = useContext(TasksContext)

  const hasTasks = tasks.length > 0
  const isFilteredTasksEmpty = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className="todo__empty-message">There are no tasks yet</div>
  }

  if (hasTasks && isFilteredTasksEmpty) {
    return <div className="todo__empty-message">Tasks not found</div>
  }
  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem {...task} key={task.id} className="todo__item" />
      ))}
      {/* isdone uxxaki - true */}
    </ul>
  )
}

export default memo(TodoList)
