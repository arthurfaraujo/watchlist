import WatchlistsList from './components/WatchlistsList'

export default async function MyWatchlists() {
  const watchlists = JSON.parse(localStorage.getItem('watchlists') ?? '[]').watchlists

  const container = document.createElement('div')
  container.className = 'max-w-screen-xl mx-auto flex flex-wrap flex-grow px-2 py-4 gap-6'
  container.innerHTML = `<h2 class="text-2xl font-bold w-full">Minhas Listas de Filmes</h2>`

  const moviesContainer = document.createElement('div')
  moviesContainer.className = 'w-full flex flex-wrap gap-2'

  container.appendChild(moviesContainer)

  try {
    for (const watchlist of watchlists) {
      moviesContainer.appendChild(WatchlistsList(watchlist))
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
  return container
}
