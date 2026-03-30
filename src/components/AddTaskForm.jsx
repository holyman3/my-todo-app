import React from 'react'
import Button from './Button'
import Field from './Field'
import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext.jsx'

const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } = useContext(TasksContext)

  const onSubmit = (e) => {
    e.preventDefault()
    addTask()
  }

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        ref={newTaskInputRef}
        value={newTaskTitle}
        onInput={(e) => setNewTaskTitle(e.target.value)}
        className="todo__field"
        label="New task title"
        id="new-task"
      />
      <Button type="submit">Add</Button>
    </form>
  )
}

export default AddTaskForm
