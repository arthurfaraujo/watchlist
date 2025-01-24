import ApiService from "../../api-services/apiService";

export default async function MoviesList() {
    const moviesContainer = document.createElement("div");
    moviesContainer.className = "w-4/6 mx-auto grid grid-cols-3 gap-4 mt-4";
    const apiService = new ApiService();

    try {
        const response = await apiService.getTrendingMovies();
        response.results.forEach((movie: any) => {
            const movieCard = document.createElement("div");
            movieCard.className = "bg-neutral-700 text-neutral-100 p-2 rounded-md";
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-96 object-cover rounded-md">
                <h2 class="text-xl font-bold mt-2 text-center">${movie.title}</h2>
            `;
            moviesContainer.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }

    return moviesContainer;
}