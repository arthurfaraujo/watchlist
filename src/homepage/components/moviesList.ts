import ApiService from "../../api-services/apiService";
import MovieCard from "../../api-services/moviesCards";

export default async function MoviesList() {
    const containerWrapper = document.createElement("div");
    containerWrapper.className = "w-full overflow-hidden p-4";

    containerWrapper.innerHTML = `<h2 class="text-2xl font-bold text-blue-500 p-4">Trending Movies</h2>`;

    const moviesContainer = document.createElement("div");
    moviesContainer.className = "flex overflow-x-auto space-x-4 p-4";

    containerWrapper.appendChild(moviesContainer);

    const apiService = new ApiService();

    try {
        const response = await apiService.getTrendingMovies();
        response.results.forEach((movie: any) => {
            const movieCard = document.createElement("div");
            movieCard.className = "flex-shrink-0 w-64 bg-neutral-700 text-neutral-100 p-2 rounded-md cursor-pointer flex flex-col justify-between";
            movieCard.innerHTML = `
                <div class="h-96 overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-80 object-cover rounded-md">
                    <h2 class="text-xl font-bold mt-2 text-center">${movie.title}</h2>
                </div>
                <button class="mt-2 bg-blue-700 text-neutral-100 p-2 rounded-md w-full">Listar</button>
            `;
            movieCard.addEventListener("click", () => MovieCard(movie.id));
            moviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }

    return containerWrapper;
}

export async function movieBycategory(category: string) {
    const containerWrapper = document.createElement("div");
    containerWrapper.className = "w-full overflow-hidden p-4";

    containerWrapper.innerHTML = `<h2 class="text-2xl font-bold text-blue-500 p-4">Filmes Comédia</h2>`;

    const moviesContainer = document.createElement("div");
    moviesContainer.className = "flex overflow-x-auto space-x-4 p-4";

    containerWrapper.appendChild(moviesContainer);

    const apiService= new ApiService();

    try {
        const response = await apiService.getMoviesByCategory(category);
        response.results.forEach((movie: any) => {
            const movieCard = document.createElement("div");
            movieCard.className = "flex-shrink-0 w-64 bg-neutral-700 text-neutral-100 p-2 rounded-md cursor-pointer flex flex-col justify-between";
            movieCard.innerHTML = `
                <div class="h-96 overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-80 object-cover rounded-md">
                    <h2 class="text-xl font-bold mt-2 text-center">${movie.title}</h2>
                </div>
                <button class="mt-2 bg-blue-700 text-neutral-100 p-2 rounded-md w-full">Listar</button>
            `;
            movieCard.addEventListener("click", () => MovieCard(movie.id));
            moviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }

    return containerWrapper;
}