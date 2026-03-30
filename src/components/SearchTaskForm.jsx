import React, { useContext } from 'react'
import Field from './Field'
import { TasksContext } from '../context/TasksContext.jsx'

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext)

  return (
    <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
      <Field
        onInput={(e) => setSearchQuery(e.target.value)}
        className="toto__Field"
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
      />
    </form>
  )
}

export default SearchTaskForm
