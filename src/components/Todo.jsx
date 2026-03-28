import React, { useEffect, useState } from 'react'

import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'
const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return [
      { id: 'task-1', title: 'Buy Milk', isDone: false },
      { id: 'task-2', title: 'Walk The Dog', isDone: true },
    ]
  }) //this code runs before the first render(UE one runs after the render)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const deleteAllTasks = () => {
    const isConfirmed = confirm('You sure to delete all the tasks')
    if (isConfirmed) {
      setTasks([])
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(({ id }) => id !== taskId))
  }

  const toggleTask = (taskId, isDone) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task)))
  }

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('') //to see new item(cuz search query can interfere it)
    }
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)) //can only have strings in localStorage
  }, [tasks])

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredTasks =
    normalizedQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(normalizedQuery))
      : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTask}
      />
    </div>
  )
}

export default Todo
