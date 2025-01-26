import ApiService from '@/api-services/apiService'

function ListMovieCard(movie: any) {
  const movieCard = document.createElement('div')
  movieCard.className =
    'flex-shrink-0 w-64 bg-neutral-700 text-neutral-100 p-2 rounded-md cursor-pointer flex flex-col justify-between w-1/5'
  movieCard.innerHTML = `
                <div class="h-96 overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-80 object-cover rounded-md" id="movie-img">
                    <h2 class="text-xl font-bold mt-2 text-center">${movie.title}</h2>
                </div>
            `
  return movieCard
}

export default async function MyWatchlist() {
  const apiService = new ApiService()
  const watchlist = JSON.parse(localStorage.getItem('watchlist') ?? '[]').toWatch

  const container = document.createElement('div')
  container.className = 'w-4/6 flex flex-col flex-grow p-4'

  container.innerHTML = `<h2 class="text-2xl font-bold text-blue-500 p-4">Minhas Listas de Filmes</h2>`

  const moviesContainer = document.createElement('div')
  moviesContainer.className = 'flex overflow-hidden space-x-4 p-4'

  container.appendChild(moviesContainer)

  try {
    for (const movieId of watchlist) {
      const movie = await apiService.getMovieById(movieId)

      moviesContainer.appendChild(ListMovieCard(movie))
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
  return container
}
