import React, { useState } from 'react'
import Button from './Button'
import Field from './Field'
import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext.jsx'

const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } = useContext(TasksContext)

  const [error, setError] = useState('')

  const normalizedTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = normalizedTaskTitle.length === 0

  const onSubmit = (e) => {
    e.preventDefault()
    if (!isNewTaskTitleEmpty) {
      addTask(normalizedTaskTitle)
    }
  }

  const onInput = (e) => {
    const { value } = e.target
    const clearedValue = value.trim()
    const hasOnlyValues = value.length > 0 && clearedValue.length === 0

    setNewTaskTitle(e.target.value)
    setError(hasOnlyValues ? 'The task cannot be empty' : '')
  }

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        ref={newTaskInputRef}
        value={newTaskTitle}
        onInput={onInput}
        error={error}
        className="todo__field"
        label="New task title"
        id="new-task"
      />
      <Button isDisabled={isNewTaskTitleEmpty} type="submit">
        Add
      </Button>
    </form>
  )
}

export default AddTaskForm
