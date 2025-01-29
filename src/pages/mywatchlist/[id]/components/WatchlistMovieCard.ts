import { MediaType } from "@/api-services/MovieCard"

export default function HorizontalMovieCard(title: any) {
  title.title = title.media_type === MediaType.movie ? title.title : title.name

  const container = document.createElement('div')
  container.className = 'flex flex-col'
  container.innerHTML = `
    <div class="relative w-full h-80">
      <img src="https://image.tmdb.org/t/p/w500${title.poster_path}" alt="${title.title}" class="w-full h-full object-cover">
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white">
        <h3 class="text-sm font-bold">${title.title}</h3>
        <p class="text-xs">${new Date(title.media_type === MediaType.movie ? title.release_date : title.first_air_date + 'T00:00:00').toLocaleDateString()}</p>
      </div>
    </div>
  `

  return container
}