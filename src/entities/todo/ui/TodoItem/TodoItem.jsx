import React from 'react'
import { memo } from 'react'
import { useContext, useRef } from 'react'
import { TasksContext } from '@/entities/todo'
import RouterLink from '@/shared/ui/RouterLink'

import styles from './TodoItem.module.scss'

const TodoItem = ({ className, id, title, isDone }) => {
  console.log('TodoItem')

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTask,
    disappearingTaskId,
    appearingTaskId,
  } = useContext(TasksContext)

  return (
    <li
      className={`
        ${styles.todoItem} 
        ${className} 
        ${disappearingTaskId === id ? styles.isDisappearing : ''} 
        ${appearingTaskId === id ? styles.isAppearing : ''}
      `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}>
      <input
        onChange={({ target }) => toggleTask(id, target.checked)}
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
      />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>
      <RouterLink to={`/tasks/${id}`} aria-label="Task detail page">
        {title}
      </RouterLink>
      <button
        onClick={() => deleteTask(id)}
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  )
}

export default memo(TodoItem)
