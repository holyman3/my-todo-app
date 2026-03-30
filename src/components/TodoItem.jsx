import React from 'react'
import { memo } from 'react'

const TodoItem = ({
  className,
  id,
  title,
  isDone,
  onDeleteTaskButtonClick,
  onTaskCompleteChange,
  ref,
}) => {
  console.log('TodoItem')

  return (
    <li className={`todo-item ${className}`} ref={ref}>
      <input
        onChange={({ target }) => onTaskCompleteChange(id, target.checked)}
        className="todo-item__checkbox"
        id={id}
        type="checkbox"
        checked={isDone}
      />
      <label className="todo-item__label" htmlFor={id}>
        {title}
      </label>
      <button
        onClick={() => onDeleteTaskButtonClick(id)}
        className="todo-item__delete-button"
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
