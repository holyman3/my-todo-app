import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ tasks = [] }) => {
  const hasTasks = true
  return hasTasks ? (
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem {...task} key={task.id} className="todo__item" />
      ))}
      {/* isdone uxxaki - true */}
    </ul>
  ) : (
    <div className="todo__empty-message"></div>
  )
}

export default TodoList
