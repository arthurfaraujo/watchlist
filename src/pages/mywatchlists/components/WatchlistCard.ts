import MoreVert from '@/assets/morevert.svg'
import { formatTitle } from '@/pages/homepage/MoviesList'

export interface Watchlist {
  id: number
  name: string
  movies: any[]
}

export default function WatchlistCard(watchlist: Watchlist) {
  const card = document.createElement('div')
  card.className = 'flex w-full bg-neutral-800 p-4 gap-4 rounded items-center border border-1 border-[#303232]'
  card.innerHTML = `
                <div class="cursor-pointer">
                  <a href=${`/mywatchlist/${watchlist.id}`}><img src="${watchlist.movies[0]?.poster_path ? "https://image.tmdb.org/t/p/w500"  + watchlist.movies[0]?.poster_path : "/placeholder.png"}" class="w-16 h-24 object-cover" /></a>
                </div>
                <div class="flex flex-col">
                    <a href=${`/mywatchlist/${watchlist.id}`}><h3 class="font-bold cursor-pointer">${formatTitle(watchlist.name, 70)}</h3></a>
                    <span class="text-sm">${watchlist.movies.length} títulos</span>
                </div>
                <img src="${MoreVert}" class="ml-auto w-8 h-8 cursor-pointer" />
                
            `
  
  return card
}