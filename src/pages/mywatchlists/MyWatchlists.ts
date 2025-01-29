import WatchlistCard from './components/WatchlistCard'

export default async function MyWatchlists() {
  const watchlists = JSON.parse(localStorage.getItem('watchlists') ?? '[]').watchlists

  const container = document.createElement('div')
  container.className = 'max-w-screen-xl mx-auto flex flex-wrap flex-grow px-2 py-4 gap-6'
  container.innerHTML = `<h2 class="text-lg font-bold w-full pt-4 border-b border-b-[#313232]">Minhas Listas de Filmes</h2>`

  const watchlistsContainer = document.createElement('div')
  watchlistsContainer.className = 'w-full flex flex-wrap gap-2'

  container.appendChild(watchlistsContainer)

  try {
    for (const watchlist of watchlists) {
      watchlistsContainer.appendChild(WatchlistCard(watchlist))
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
  return container
}
