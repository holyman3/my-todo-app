import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'
import Button from './Button'
const Todo = () => {
  console.log('Todo')

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

  const newTaskInputRef = useRef(null)
  //console.log('ref', newTaskInputRef)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

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
    localStorage.setItem('tasks', JSON.stringify(tasks)) //can only have strings in localStorage
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

  const tasksDone = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TodoInfo total={tasks.length} done={tasksDone} onDeleteAllButtonClick={deleteAllTasks} />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        Show First Incomplete Task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTask}
      />
    </div>
  )
}

export default Todo
