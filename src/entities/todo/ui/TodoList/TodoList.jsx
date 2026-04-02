import React from 'react'
import { TodoItem, TasksContext } from '@/entities/todo'
import { memo } from 'react'
import { useContext } from 'react'

const TodoList = ({ styles }) => {
  console.log('TodoList')

  const { tasks = [], filteredTasks } = useContext(TasksContext)

  const hasTasks = tasks.length > 0
  const isFilteredTasksEmpty = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>
  }

  if (hasTasks && isFilteredTasksEmpty) {
    return <div className={styles.emptyMessage}>Tasks not found</div>
  }
  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem {...task} key={task.id} className={styles.item} />
      ))}
      {/* isdone uxxaki - true */}
    </ul>
  )
}

export default memo(TodoList)
