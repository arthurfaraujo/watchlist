"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ApiService from "@/services/apiService";
import { MediaResponse, SearchResponse } from "@/types/media";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<MediaResponse[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      ApiService.searchMulti(inputValue).then((data: SearchResponse) => {
        const sortedData = data.results.sort((a, b) => {
          const hasImageA = a.poster_path || a.profile_path;
          const hasImageB = b.poster_path || b.profile_path;
          // Coloca primeiro as imagens
          if (hasImageA && !hasImageB) return -1;
          if (!hasImageA && hasImageB) return 1;
          // Depois checar a popularidade
          if ((b.popularity || 0) !== (a.popularity || 0)) {
            return (b.popularity || 0) - (a.popularity || 0);
          }
          // Depois pelo vote average
          if ((b.vote_average || 0) !== (a.vote_average || 0)) {
            return (b.vote_average || 0) - (a.vote_average || 0);
          }
          // Por fim pelas datas
          const dateA = a.first_air_date || a.release_date || "1900-01-01";
          const dateB = b.first_air_date || b.release_date || "1900-01-01";
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        setData(sortedData);
      });
    } else {
      setData([]);
    }
  }, [inputValue]);

  return (
    <form className="relative">
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pr-8 text-xs rounded-lg bg-neutral-700 border border-neutral-700 placeholder-neutral-400 text-white outline-none focus:border-neutral-600"
          placeholder="Pesquise por filmes/series..."
          value={inputValue}
          onFocus={() => setShowSearch(true)}
          onBlur={() => setShowSearch(false)}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <FaSearch className="absolute end-3 top-2 text-gray-400 cursor-pointer" />

        <button type="submit" className="hidden"></button>
      </div>
      <div
        className={`${
          showSearch && data.length > 0 ? "block" : "hidden"
        } bg-neutral-800 z-10 h-96 w-full overflow-auto absolute p-2 rounded-b bg-opacity-95 backdrop-blur-sm`}
        onMouseDown={(e) => e.preventDefault()}>
        <SearchResults data={data} />
      </div>
    </form>
  );
}
