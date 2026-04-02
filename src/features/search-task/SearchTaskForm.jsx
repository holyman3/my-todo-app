import React, { useContext } from 'react'
import Field from '@/shared/ui/Field'
import { TasksContext } from '@/entities/todo'

const SearchTaskForm = ({ styles }) => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext)

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Field
        onInput={(e) => setSearchQuery(e.target.value)}
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
      />
    </form>
  )
}

export default SearchTaskForm
