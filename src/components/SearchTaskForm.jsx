import React from 'react'
import Field from './Field'

const SearchTaskForm = ({ searchQuery, setSearchQuery }) => {
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
