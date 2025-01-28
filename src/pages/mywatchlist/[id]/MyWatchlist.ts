import { Watchlist } from "@/pages/mywatchlists/components/WatchlistCard"
import WatchlistMovieCard from "./components/WatchlistMovieCard"

export default async function MyWatchlist(params: string[]) {
  const id = Number(params[0])
  
  const watchlists: Watchlist[] = JSON.parse(localStorage.getItem('watchlists') ?? '[]').watchlists
  const watchlist = watchlists.find(watchlist => watchlist.id === id)

  if (!watchlist) {
    const notFound = document.createElement('div')
    notFound.className = 'w-full h-20'
    notFound.innerText = '404'
    return notFound
  }

  const container = document.createElement('div')
  container.className = 'max-w-screen-xl mx-auto flex flex-col items-center px-2 py-4 gap-6'
  container.innerHTML = `<h2 class="text-lg font-bold w-full pt-4 border-b border-b-[#313232]">${watchlist?.name}</h2>`

  const moviesContainer = document.createElement('div')
  moviesContainer.className = 'w-full grid grid-cols-[repeat(auto-fill,200px)] justify-center content-start gap-3 p-2 flex-grow'

  container.appendChild(moviesContainer)

  try {
    for (const title of watchlist.movies) {
      moviesContainer.appendChild(WatchlistMovieCard(title))
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
  return container
}