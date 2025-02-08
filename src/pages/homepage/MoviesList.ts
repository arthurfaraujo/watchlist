import ApiService from '@/api-services/apiService'
import MovieCard, { MediaType } from '@/api-services/MovieCard'
import { addTitleToWatchlist } from '@/api-services/watchlist'

export function formatTitle(title: string, maxLength = 35) {
  return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
}

async function createCarousel(
  titulo: string,
  media_type: string,
  apiFunction: () => Promise<any>
) {
  const containerWrapper = document.createElement('div')
  containerWrapper.className = 'w-full overflow-hidden p-4 relative'

  containerWrapper.innerHTML = `<h2 class="text-lg font-bold  pt-4 border-b border-b-[#313232]">${titulo}</h2>`

  const moviesContainer = document.createElement('div')
  moviesContainer.className = 'carrossel flex overflow-hidden space-x-4 p-4'

  containerWrapper.appendChild(moviesContainer)

  const prevButton = document.createElement('button')
  prevButton.className =
    'absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-neutral-100 p-2 rounded-md'
  prevButton.innerHTML = '&#9664;' // Left arrow
  prevButton.onclick = () => {
    moviesContainer.scrollBy({
      left: -document.querySelector('.carrossel')?.clientWidth!,
      behavior: 'smooth'
    })
  }

  const nextButton = document.createElement('button')
  nextButton.className =
    'absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-neutral-100 p-2 rounded-md'
  nextButton.innerHTML = '&#9654;' // Right arrow
  nextButton.onclick = () => {
    moviesContainer.scrollBy({
      left: document.querySelector('.carrossel')?.clientWidth!,
      behavior: 'smooth'
    })
  }

  containerWrapper.appendChild(prevButton)
  containerWrapper.appendChild(nextButton)

  const apiService = new ApiService()

  try {
    const response = await apiFunction.call(apiService)
    response.results.forEach((title: any) => {
      const name = formatTitle(
        title.title ? title.title : title.name
      )
      const addButton = document.createElement('button')
      addButton.className =
      'bg-blue-700 text-neutral-100 text-sm p-2 rounded-b w-full'
      addButton.innerHTML = 'Watchlist +';
      addButton.style.transition = 'background-color 0.3 ease'; 
      addButton.addEventListener('click', () => {
      addButton.classList.remove('bg-blue-700');
      addButton.classList.add('bg-green-600'); 
        addTitleToWatchlist(title)
      })

      const movieCard = document.createElement('div')
      movieCard.className =
        'flex flex-col'
      movieCard.innerHTML = `
      <div class="relative w-56 h-80">
        <img id="movie-img" src="https://image.tmdb.org/t/p/w500${title.poster_path}" alt="${name}" class="cursor-pointer rounded-t w-full h-full object-cover">
            <div class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white">
              <h3 class="text-sm font-bold">${name}</h3>
              <div class="text-xs flex items-center justify-between">
                <p>${new Date(title.release_date ? title.release_date : title.first_air_date + 'T00:00:00').toLocaleDateString()}</p>
                <p class="flex gap-1  items-center">
                  <svg class="text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"/></svg>
                  <span>${Number(title.vote_average).toFixed(1)}</span>
                </p> 
              </div>
            </div>          
      </div>           
            `
      movieCard.appendChild(addButton)

      const movieImg = movieCard.querySelector('#movie-img') as HTMLImageElement
      movieImg.addEventListener('click', () => MovieCard(title.id, media_type))
      moviesContainer.appendChild(movieCard)
    })
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
  return containerWrapper
}

export default async function moviesList() {
  const apiService = new ApiService()

  const container = document.createElement('div')
  container.className =
    'max-w-screen-xl xl:mx-auto mx-4 flex flex-wrap justify-center'

  container.appendChild(
    await createCarousel(
      'Filmes em alta',
      MediaType.movie,
      apiService.getTrendingMovies
    )
  )

  container.appendChild(
    await createCarousel(
      'Series em alta',
      MediaType.series,
      apiService.getTrendingTvShows
    )
  )

  container.appendChild(
    await createCarousel('Filmes de Comédia', MediaType.movie, () =>
      apiService.getMoviesByCategory('35')
    )
  )
  container.appendChild(
    await createCarousel('Filmes de Terror', MediaType.movie, () =>
      apiService.getMoviesByCategory('27')
    )
  )

  container.appendChild(
    await createCarousel('Séries de Drama', MediaType.series, () =>
      apiService.getTvByCategory('18')
    )
  )

  return container
}
