import React from 'react'
import TodoItem from './TodoItem'
import { memo } from 'react'

const TodoList = ({
  tasks = [],
  filteredTasks,
  onDeleteTaskButtonClick,
  onTaskCompleteChange,
  firstIncompleteTaskRef,
  firstIncompleteTaskId,
}) => {
  console.log('TodoList')

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
        <TodoItem
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          {...task}
          key={task.id}
          className="todo__item"
          onTaskCompleteChange={onTaskCompleteChange}
          ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
        />
      ))}
      {/* isdone uxxaki - true */}
    </ul>
  )
}

export default memo(TodoList)
