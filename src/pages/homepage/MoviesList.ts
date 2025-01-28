import ApiService from "@/api-services/apiService";
import MovieCard, { MediaType } from "@/api-services/MovieCard";

export function formatTitle(title: string, maxLength = 35) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

async function createCarousel(
  titulo: string,
  media_type: string,
  apiFunction: () => Promise<any>
) {
  const containerWrapper = document.createElement("div");
  containerWrapper.className = "w-full overflow-hidden p-4 relative";

  containerWrapper.innerHTML = `<h2 class="text-lg font-bold text-neutral-100 pt-4 border-b border-b-[#313232]">${titulo}</h2>`;

  const moviesContainer = document.createElement("div");
  moviesContainer.className = "carrossel flex overflow-hidden space-x-4 p-4";

  containerWrapper.appendChild(moviesContainer);

  const prevButton = document.createElement("button");
  prevButton.className =
    "absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-neutral-100 p-2 rounded-md";
  prevButton.innerHTML = "&#9664;"; // Left arrow
  prevButton.onclick = () => {
    moviesContainer.scrollBy({
      left: -document.querySelector(".carrossel")?.clientWidth!,
      behavior: "smooth",
    });
  };

  const nextButton = document.createElement("button");
  nextButton.className =
    "absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-neutral-100 p-2 rounded-md";
  nextButton.innerHTML = "&#9654;"; // Right arrow
  nextButton.onclick = () => {
    moviesContainer.scrollBy({
      left: document.querySelector(".carrossel")?.clientWidth!,
      behavior: "smooth",
    });
  };

  containerWrapper.appendChild(prevButton);
  containerWrapper.appendChild(nextButton);

  const apiService = new ApiService();

  try {
    const response = await apiFunction.call(apiService);
    response.results.forEach((title: any) => {
      const name = formatTitle(
        media_type === MediaType.filme ? title.title : title.name
      );
      const movieCard = document.createElement("div");
      movieCard.className =
        "h-[440px] w-56 justify-between items-center border border-1 border-[#303232] flex-shrink-0 bg-neutral-800 text-neutral-100 p-2 rounded-md cursor-pointer flex flex-col";
      movieCard.innerHTML = `
                <div class="flex flex-col items-center">
                    <img src="https://image.tmdb.org/t/p/w500${title.poster_path}" alt="${name}" class="h-80 object-cover rounded-md" id="movie-img">
                    <h2 class="text-base font-bold my-2 break-words text-center">${name}</h2>
                </div>
                <button class="bg-blue-700 text-neutral-100 text-sm p-2 rounded-md w-full">Listar</button>
            `;
      const movieImg = movieCard.querySelector(
        "#movie-img"
      ) as HTMLImageElement;
      movieImg.addEventListener("click", () => MovieCard(title.id, media_type));
      moviesContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
  return containerWrapper;
}

export default async function moviesList() {
  const apiService = new ApiService();

  const container = document.createElement("div");
  container.className =
    "max-w-screen-xl xl:mx-auto mx-4 flex flex-wrap justify-center";

  container.appendChild(
    await createCarousel(
      "Filmes em alta",
      MediaType.filme,
      apiService.getTrendingMovies
    )
  );

  container.appendChild(
    await createCarousel(
      "Series em alta",
      MediaType.serie,
      apiService.getTrendingTvShows
    )
  );

  container.appendChild(
    await createCarousel("Filmes de Comédia", MediaType.filme, () =>
      apiService.getMoviesByCategory("35")
    )
  );
  container.appendChild(
    await createCarousel("Filmes de Terror", MediaType.filme, () =>
      apiService.getMoviesByCategory("27")
    )
  );

  container.appendChild(
    await createCarousel("Séries de Drama", MediaType.serie, () =>
      apiService.getTvByCategory("18")
    )
  );

  return container;
}
