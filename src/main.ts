import '@/style.css'
import Header from '@/components/header'
import MoviesList from '@/pages/homepage/MoviesList'
import MyWatchlist from '@/pages/my_watchlist/MyWatchlists'

const app = document.querySelector<HTMLDivElement>('#app')
document.querySelector<HTMLDivElement>('body')!.className = 'bg-neutral-900 min-h-screen'


interface Routes {
  '/': typeof MoviesList
  '/mywatchlists': typeof MyWatchlist
}

const routes: Routes = {
  '/': MoviesList,
  '/mywatchlists': MyWatchlist
}

const render = (path: string) => {
  app!.innerHTML = Header()

  if (path in routes) {
    routes[path as keyof Routes]().then(page => app!.appendChild(page))
  } else {
    app!.innerHTML += '<div class="w-full h-20">404</div>'
  }

}

window.addEventListener('popstate', () =>
  render(new URL(window.location.href).pathname)
)

render(new URL(window.location.href).pathname)
