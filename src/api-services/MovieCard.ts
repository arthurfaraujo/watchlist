import ApiService from './apiService'

export enum MediaType {
  movie = 'movie',
  series = 'tv',
  person = 'person'
}

export default async function MovieCard(titleId: string, mediaType: string) {
  const apiService = new ApiService()
  try {
    const title =
      mediaType === MediaType.movie
        ? await apiService.getMovieById(titleId)
        : await apiService.getTvShowById(titleId)

    const name = mediaType === MediaType.movie ? title.title : title.name
    const releaseDate = new Date(
      mediaType === MediaType.movie ? title.release_date : title.first_air_date
    ).toLocaleDateString('pt-BR')
    const movieCard = document.createElement('div')
    movieCard.className =
      'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
    movieCard.id = 'modalFilme'
    movieCard.innerHTML = `
            <div class="relative border border-1 border-neutral-700 flex gap-4 bg-neutral-800 text-neutral-100 p-3 rounded-md max-w-2xl">
                <button class="absolute top-3 right-3 text-neutral-100 hover:text-blue-700 bg-transparent" id="closeButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                </button>
                ${
                  title.poster_path
                    ? `<img class="w-72 rounded-md" src='https://image.tmdb.org/t/p/w500${title.poster_path}'>`
                    : `<img class="w-48 h-60 object-cover rounded-md" src='/placeholder.png'>`
                }
                <div class="flex flex-col">
                    <h2 class="text-2xl font-bold mb-2 pe-6">${name}</h2>
                    <p class="text-sm">${
                      title.overview ? title.overview : 'Titulo sem sinopse...'
                    }</p>
                    <p class="text-sm mt-4 font-semibold">Release Date: <span class="font-normal">${releaseDate}</span></p>
                    <p class="text-sm font-semibold">Rating: <span class="font-normal">${Number(
                      title.vote_average
                    ).toFixed(1)}
                    </span></p>
                    </div>
                </div>
            </div>
        `
    document.body.appendChild(movieCard)

    document.getElementById('closeButton')!.addEventListener('click', () => {
      document.body.removeChild(movieCard)
    })
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error)
  }
}
