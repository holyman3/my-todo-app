//not in comps, cuz it's higher level app wrapper, not a reusable component

import { useState, useEffect } from 'react'

const matchPath = (path, route) => {
  const pathParts = path.split('/') // /tasks/123 => ['', 'tasks', '123']
  const routePaths = route.split('/') // /tasks/:id => ['', 'tasks', ':id']

  if (pathParts.length !== routePaths.length) {
    return null
  }

  const params = {}

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(':')) {
      const paramName = routePaths[i].slice(1)

      params[paramName] = pathParts[i]
    } else if (routePaths[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}

export const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, []) //set event handler once

  return path
}

const Router = ({ routes }) => {
  const path = useRoute()

  for (const route in routes) {
    const params = matchPath(path, route)

    if (params) {
      const Page = routes[route]

      return <Page params={params} />
    }
  }

  const NotFound = routes['*']

  return <NotFound />
}

export default Router

/* 

  const Page = routes[path] ?? routes['*']
if (path.startsWith('/tasks/')) {
    const id = path.replace('/tasks/', '')
    const TaskPage = routes['/tasks/:id']

    return <TaskPage params={{ id }} />
  }

  return <Page />
*/
