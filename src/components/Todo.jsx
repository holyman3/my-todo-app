import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'
import Button from './Button'
import { TasksContext } from '../context/TasksContext.jsx'
const Todo = () => {
  console.log('Todo')

  const { firstIncompleteTaskRef } = useContext(TasksContext)

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        Show First Incomplete Task
      </Button>
      <TodoList />
    </div>
  )
}

export default Todo
