import ApiService from "./apiService";

export default async function MovieCard(movieId: string) {
    const apiService = new ApiService();
    try {
        const movie = await apiService.getMovieById(movieId);
        const movieCard = document.createElement("div");
        movieCard.className = "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50";
        movieCard.innerHTML = `
            <div class="bg-neutral-800 text-neutral-100 p-4 rounded-md w-1/4">
                <button class="text-neutral-100 float-right" id="closeButton">X</button>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-96 w-96 rounded-md">
                <h2 class="text-2xl font-bold mt-2">${movie.title}</h2>
                <p class="mt-1">${movie.overview}</p>
                <p class="mt-1">Release Date: ${movie.release_date}</p>
                <p class="mt-1">Rating: ${movie.vote_average}</p>
            </div>
        `;
        document.body.appendChild(movieCard);

        document.getElementById("closeButton")!.addEventListener("click", () => {
            document.body.removeChild(movieCard);
        });
    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
    }
}