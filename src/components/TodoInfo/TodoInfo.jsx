import React from 'react'
import { memo, useMemo } from 'react'
import { useContext } from 'react'
import { TasksContext } from '../../context/TasksContext.jsx'

const TodoInfo = ({ styles }) => {
  console.log('TodoInfo')

  const { tasks, deleteAllTasks } = useContext(TasksContext) //returns provider's value values

  const total = tasks.length
  const hasTasks = total > 0
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button onClick={deleteAllTasks} className={styles.deleteAllButton} type="button">
          Delete all
        </button>
      )}
    </div>
  )
}

export default memo(TodoInfo)
