import Router from './routing/Router'
import TaskPage from '@/pages/TaskPage'
import TasksPage from '@/pages/TasksPage'

import './styles'

const App = () => {
  console.log('App')

  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 Page Not Found</div>,
  }

  return <Router routes={routes} />
}

export default App
