import ApiService from "../../api-services/apiService";
import MovieCard from "../../api-services/moviesCards";

async function createCarousel(titulo: string, apiFunction: () => Promise<any>) {
    const containerWrapper = document.createElement("div");
    containerWrapper.className = "w-full overflow-hidden p-4 relative";

    containerWrapper.innerHTML = `<h2 class="text-2xl font-bold text-blue-500 p-4">${titulo}</h2>`;

    const moviesContainer = document.createElement("div");
    moviesContainer.className = "flex overflow-hidden space-x-4 p-4";

    containerWrapper.appendChild(moviesContainer);

    const prevButton = document.createElement("button");
    prevButton.className = "absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-neutral-100 p-2 rounded-md";
    prevButton.innerHTML = "&#9664;"; // Left arrow
    prevButton.onclick = () => {
        moviesContainer.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const nextButton = document.createElement("button");
    nextButton.className = "absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-neutral-100 p-2 rounded-md";
    nextButton.innerHTML = "&#9654;"; // Right arrow
    nextButton.onclick = () => {
        moviesContainer.scrollBy({ left: 400, behavior: 'smooth' });
    };

    containerWrapper.appendChild(prevButton);
    containerWrapper.appendChild(nextButton);

    const apiService = new ApiService();

    try {
        const response = await apiFunction.call(apiService);
        response.results.forEach((movie: any) => {
            const movieCard = document.createElement("div");
            movieCard.className = "flex-shrink-0 w-64 bg-neutral-700 text-neutral-100 p-2 rounded-md cursor-pointer flex flex-col justify-between w-1/5";
            movieCard.innerHTML = `
                <div class="h-96 overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-80 object-cover rounded-md" id="movie-img">
                    <h2 class="text-xl font-bold mt-2 text-center">${movie.title}</h2>
                </div>
                <button class="mt-2 bg-blue-700 text-neutral-100 p-2 rounded-md w-full">Listar</button>
            `;
            const movieImg = movieCard.querySelector("#movie-img") as HTMLImageElement;
            movieImg.addEventListener("click", () => MovieCard(movie.id));
            moviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
    return containerWrapper;
}


export async function moviesList() {
    const container = document.createElement("div");
    container.className = "w-4/5 flex flex-col items-center";

    container.appendChild(await createCarousel("Filmes em alta", ApiService.prototype.getTrendingAll));

    container.appendChild(await createCarousel("Series em alta", ApiService.prototype.getTrendingTvShows));

    // container.appendChild(await createCarousel("Filmes de Comédia", () => ApiService.prototype.getMoviesByCategory("28"))); 
    // ⚠️ Não funciona, depois desconbrir o motivo.

    return container;
}