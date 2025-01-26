import MoreVert from '@/assets/morevert.svg'
import { formatTitle } from '@/pages/homepage/MoviesList'

interface Watchlist {
  name: string
  movies: any[]
}

export default function WatchlistsList(watchlist: Watchlist) {
  const card = document.createElement('div')
  card.className = 'flex w-full bg-neutral-800 p-4 gap-4 rounded items-center border border-1 border-[#303232]'
  card.innerHTML = `
                <div class="w-16 aspect-auto cursor-pointer">
                  <img src="https://image.tmdb.org/t/p/w500${watchlist.movies[0]?.poster_path}" />
                </div>
                <div class="flex flex-col">
                    <h3 class="font-bold cursor-pointer">${formatTitle(watchlist.name, 70)}</h3>
                    <span class="text-sm">${watchlist.movies.length} títulos</span>
                </div>
                <img src="${MoreVert}" class="ml-auto w-8 h-8 cursor-pointer" />
                
            `
  return card
}