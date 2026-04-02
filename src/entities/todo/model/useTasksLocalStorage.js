const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks')

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks)) //can only have strings in localStorage
  }

  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks,
  }
}

export default useTasksLocalStorage
