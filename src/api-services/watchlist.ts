import { Watchlist } from '@/pages/mywatchlists/components/WatchlistCard'

export function addTitleToWatchlist(title: any) {
  const storage = JSON.parse(
    localStorage.getItem('watchlists') ??
      "{ watchlists: [{id: 1, name: 'Watchlist', movies: []}], id: 2 }"
  )
  const watchlists: Watchlist[] = storage.watchlists
  const watchlist = watchlists.find(watchlist => watchlist.id === 1)

  const alreadyExist = watchlist?.movies.find(movie => movie.id === title.id)

  if (alreadyExist) {
    console.log('already exist')
    return
  }

  watchlist?.movies.push(title)
  localStorage.setItem('watchlists', JSON.stringify(storage))
}
