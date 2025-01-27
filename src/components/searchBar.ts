import ApiService from "@/api-services/apiService";
import { MediaType } from "@/api-services/MovieCard";

interface Result {
    id: number;
    title: string;
    name?: string;
    media_type: MediaType;  // Assumindo que 'movie' ou 'tv' são os tipos possíveis
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
}

// Definindo um tipo para a resposta da API
interface ApiResponse {
    results: Result[];
}

export default function SearchBar() {
    const apiService = new ApiService()
    const searchBar = document.createElement("form")
    searchBar.className = "w-full"
    searchBar.innerHTML = `
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <input type="search" id="default-search" class="block w-full p-2 pr-8 text-xs rounded-lg bg-neutral-700 border border-neutral-700 placeholder-neutral-400 text-white outline-none focus:border-neutral-600" placeholder="Pesquise por filmes/series..." required />
        
        <div id="lupa" class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>

        <button type="submit" class="hidden"></button>
    </div>`;
    searchBar.querySelector("#lupa")!.addEventListener("click", () => {
        const input = searchBar.querySelector("input")!
        if (input && input.checkValidity()) {
            searchBar.submit();
        } else {
            input.reportValidity();     
        }
    })
    
    function showSearchResults(apiResponse: ApiResponse){
        const searchBarContainer = document.getElementById("searchBarContainer")!
        const content = document.createElement("div")
        content.className = "";
        content.innerHTML = apiResponse.results.map(item => {
            return `
            <div class="flex">
                <p>${item.media_type === MediaType.filme? item.title : item.name}</p>
            </div>`;
        }).join("")
        searchBarContainer.appendChild(content)
    }

    const input = searchBar.querySelector("input")!
    let timeout;
    input.addEventListener("keypress", () => {
        clearTimeout(timeout!);
        const delayTime = input.value.length > 4 ? 500 : 1500;
        timeout = setTimeout(() => {
            apiService.searchMulti(input.value).then((apiResponse) => {
                showSearchResults(apiResponse)
            })
        }, delayTime)
    })
    
    return searchBar
}