import Header from '@/components/Header'
import MoviesList from '@/pages/homepage/MoviesList'
import MyWatchlists from '@/pages/mywatchlists/MyWatchlists'
import MyWatchlist from '@/pages/mywatchlist/[id]/MyWatchlist'

import { app } from '@/main'

interface Routes {
  '/': typeof MoviesList
  '/mywatchlists': typeof MyWatchlist
  '/mywatchlist/:id': typeof MyWatchlist
}

const routes: Routes = {
  '/': MoviesList,
  '/mywatchlists': MyWatchlists,
  '/mywatchlist/:id': MyWatchlist
}

export function render(path: string) {
  app!.innerHTML = ''
  app!.appendChild(Header())

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
