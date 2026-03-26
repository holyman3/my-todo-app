import React from 'react'
import Field from './Field'

const SearchTaskForm = () => {
  return (
    <form className="todo__form">
      <Field className="toto__Field" label="Search task" id="search-task" type="search" />
    </form>
  )
}

export default SearchTaskForm
