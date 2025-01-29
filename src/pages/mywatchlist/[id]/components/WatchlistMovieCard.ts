export default function HorizontalMovieCard(title: any) {
  const name = title.title ?  title.title : title.name
  const date = title.release_date ? title.release_date : title.first_air_date

  const container = document.createElement('div')
  container.className = 'flex flex-col'
  container.innerHTML = `
    <div class="relative w-full h-80">
      <img src="https://image.tmdb.org/t/p/w500${title.poster_path}" alt="${name}" class="w-full h-full object-cover">
      <div class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white">
        <h3 class="text-sm font-bold">${name}</h3>
        <p class="text-xs">${new Date(date + 'T00:00:00').toLocaleDateString()}</p>
      </div>
    </div>
  `

  return container
}