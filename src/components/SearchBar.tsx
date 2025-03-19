"use client";

import { useState, useEffect, useRef } from "react";
import ApiService from "@/api-services/apiService";
import MovieCard from "@/components/MovieCardModal";
import { MediaResponse, MediaType } from "@/types/media";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaResponse[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const apiService = new ApiService();

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const delayTime = query.length > 4 ? 200 : 800;
    const timeout = setTimeout(() => {
      apiService.searchMulti(query).then((apiResponse) => {
        setResults(apiResponse.results || []);
      });
    }, delayTime);

    return () => clearTimeout(timeout);
  }, [query]);

  // Fecha os resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" id="searchBarContainer">
      <label htmlFor="search" className="sr-only">
        Pesquisar
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          id="search"
          className="block w-full p-2 pr-8 text-xs rounded-lg bg-neutral-700 border border-neutral-700 placeholder-neutral-400 text-white outline-none focus:border-neutral-600"
          placeholder="Pesquise por filmes/séries..."
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setResults(results)}
        />
        <div
          className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
          onClick={() => inputRef.current?.reportValidity()}>
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>

      {results.length > 0 && (
        <div
          ref={searchResultsRef}
          id="searchResults"
          className="max-h-96 overflow-auto z-50 flex flex-col gap-2 absolute bg-neutral-800 rounded w-full p-4 mt-2">
          {results
            .filter((item) => item.popularity >= 0.1)
            .map((item) => (
              <SearchResultItem key={item.id} item={item} />
            ))}
        </div>
      )}
    </div>
  );
}

function SearchResultItem({ item }: { item: MediaResponse }) {
  const formatReleaseDate = (date?: string) => {
    if (!date) return "";
    const releaseDate = new Date(date).toLocaleDateString("pt-BR");
    return releaseDate === "Invalid Date" ? "" : releaseDate;
  };

  if (item.media_type === MediaType.person && item.profile_path) {
    return (
      <div className="flex gap-2">
        <img
          className="rounded h-16"
          src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
          alt={item.name}
        />
        <p className="text-sm">{item.name}</p>
      </div>
    );
  }

  if (!item.poster_path && !item.overview) return null;
  const releaseDate = formatReleaseDate(
    item.release_date || item.first_air_date
  );
  if (!releaseDate) return null;

  return (
    <div
      className="cursor-pointer flex gap-2"
      // onClick={() => MovieCard(item.id, item.media_type)}
    >
      <img
        className="rounded h-16 w-12 object-cover"
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/placeholder.png"
        }
        alt={item.title || item.name}
      />
      <p className="text-sm">
        {item.media_type === MediaType.movie ? item.title : item.name}
      </p>
      <p className="text-xs ml-auto">{releaseDate}</p>
    </div>
  );
}
