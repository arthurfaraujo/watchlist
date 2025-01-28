import ApiService from "@/api-services/apiService";
import MovieCard, { MediaType } from "@/api-services/MovieCard";

interface Result {
    id: string;
    title?: string;
    name?: string;
    media_type: MediaType;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
    first_air_date?: string;
    profile_path?: string;
    popularity: number;
    overview: string;
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

    const input = searchBar.querySelector("input")!

    document.addEventListener("click", (event) => {
        const searchResults = document.getElementById("searchResults");
        const searchBarContainer = document.getElementById("searchBarContainer");

        if (
            searchResults && !searchResults.contains(event.target as Node) &&
            searchBarContainer && !searchBarContainer.contains(event.target as Node)
        ) {
            searchResults!.classList.add("hidden");
        }
    });

    input.addEventListener("focus", () => {
        const searchResultsDiv = document.getElementById("searchResults")
        if (searchResultsDiv){
            searchResultsDiv!.classList.remove("hidden");
        }
    })
    
    let timeout;
    
    input.addEventListener("input", () => {
        clearTimeout(timeout!);
        const query = input.value;
        if (query.length > 0) {
            const delayTime = query.length > 4 ? 200 : 800;
            timeout = setTimeout(() => {
                apiService.searchMulti(query).then((apiResponse) => {
                    showSearchResults(apiResponse.results);
                });
            }, delayTime);
        } else {
            showSearchResults([]);
        }
    })
    
    return searchBar
}

function showSearchResults(results: Result[]){
    const searchBarContainer = document.getElementById("searchBarContainer")!
    const content = document.createElement("div")
    content.id = "searchResults"
    content.className = "max-h-96 overflow-auto z-50 flex flex-col gap-2 absolute bg-neutral-800 rounded w-full p-4";
    
    const formatReleaseDate = (date: string | undefined) => {
        if (!date) return "";
        const releaseDate = new Date(date).toLocaleDateString("pt-BR");
        return releaseDate === "Invalid Date" ? "" : releaseDate;
    };

    const generatePersonHTML = (item: Result): HTMLElement | void => {
        if (!item.profile_path) return;
        const personHTML = document.createElement("div");
        personHTML.className = "flex gap-2"
        personHTML.innerHTML = `
            <div class="flex gap-2">
                <img class="rounded h-16" src="https://image.tmdb.org/t/p/w500${item.profile_path}">
                <p class="text-sm">${item.name}</p>
            </div>`;
        return personHTML
    };

    const generateMediaHTML = (item: Result): HTMLElement | void => {
        if (!item.poster_path && !item.overview) return;
        const releaseDate = formatReleaseDate(item.release_date || item.first_air_date);
        if (!releaseDate) return;

        const mediaHTML = document.createElement("div")
        mediaHTML.className = "cursor-pointer flex gap-2";
        mediaHTML.innerHTML = `
            <img class="rounded h-16" src="https://image.tmdb.org/t/p/w500${item.poster_path}">
            <p class="text-sm">${item.media_type === MediaType.filme ? item.title : item.name}</p>
            <p class="text-xs ml-auto">${releaseDate}</p>
        `
        mediaHTML.addEventListener("click", () => {
            MovieCard(item.id, item.media_type)
        })
        return mediaHTML
    };
    
    
    const resultsHTML = results
    .map(item => {
        console.log(item)
        if (item.popularity < 0.1) return;
        
        if (item.media_type === MediaType.pessoa) {
            return generatePersonHTML(item);
        } else {
            return generateMediaHTML(item);
        }
    }).filter((item): item is HTMLElement => item !== undefined) as Array<HTMLElement>;
    
    resultsHTML.forEach(htmlElement => {
        content.appendChild(htmlElement);
    });
    
    const searchResults = document.getElementById("searchResults")
    if (results.length > 0) {
        if (!searchResults) {
            searchBarContainer.appendChild(content);
        } else {
            searchResults?.remove()
            searchBarContainer.appendChild(content);
        }
    } else {
        searchResults?.remove();
    }
}
