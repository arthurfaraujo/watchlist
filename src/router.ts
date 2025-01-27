import Header from '@/components/Header'
import MoviesList from '@/pages/homepage/MoviesList'
import MyWatchlist from '@/pages/my_watchlist/MyWatchlists'
import { app } from '@/main'

interface Routes {
  '/': typeof MoviesList
  '/mywatchlists': typeof MyWatchlist
  '/mywatchlists/:id': (params: string[]) => Promise<HTMLDivElement>
}

const routes: Routes = {
  '/': MoviesList,
  '/mywatchlists': MyWatchlist,
  '/mywatchlists/:id': async function (params: string[]) {
    const div = document.createElement('div')
    div.innerHTML = `My watchlist with ID: ${params[0]}`
    return div
  }
}

export function render(path: string) {
  app!.innerHTML = Header()

  const matchedRoute = matchRoute(path)
  if (matchedRoute) {
    matchedRoute
      .handler(matchedRoute.params)
      .then((page: HTMLDivElement) => app!.appendChild(page))
  } else {
    app!.innerHTML += '<div class="w-full h-20">404</div>'
  }
}

function matchRoute(path: string) {
  for (const route of Object.keys(routes)) {
    const handler = routes[route as keyof Routes]
    
    const routePattern = new RegExp(
      '^' + route.replace(/:\w+/g, '([^/]*)') + '$'
    )
    const match = routePattern.exec(path)

    if (match) {
      return { params: match.slice(1), handler }
    }
  }

  return null
}
