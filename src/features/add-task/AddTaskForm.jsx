import React, { useState } from 'react'
import Button from '@/shared/ui/Button'
import Field from '@/shared/ui/Field'
import { useContext } from 'react'
import { TasksContext } from '@/entities/todo'

const AddTaskForm = ({ styles }) => {
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
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        ref={newTaskInputRef}
        value={newTaskTitle}
        onInput={onInput}
        error={error}
        className={styles.field}
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
