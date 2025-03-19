import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ApiService from "@/api-services/apiService";
import { MediaType } from "@/types/media";

interface MovieCardProps {
  titleId: string;
  mediaType: MediaType;
  onClose: () => void;
}

export default function MovieCard({
  titleId,
  mediaType,
  onClose,
}: MovieCardProps) {
  const [title, setTitle] = useState<any>(null);
  const apiService = new ApiService();

  useEffect(() => {
    async function fetchData() {
      try {
        const data =
          mediaType === MediaType.movie
            ? await apiService.getMovieById(titleId)
            : await apiService.getTvShowById(titleId);

        setTitle(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    }

    fetchData();
  }, [titleId, mediaType]);

  if (!title) return null;

  const name = mediaType === MediaType.movie ? title.title : title.name;
  const releaseDate =
    title.release_date || title.first_air_date
      ? new Date(title.release_date || title.first_air_date).toLocaleDateString(
          "pt-BR"
        )
      : "Data desconhecida";

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative border border-neutral-700 flex gap-4 bg-neutral-800 text-neutral-100 p-3 rounded-md max-w-2xl">
        <button
          className="absolute top-3 right-3 text-neutral-100 hover:text-blue-700 bg-transparent"
          onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            />
          </svg>
        </button>

        <img
          className="w-72 rounded-md"
          src={
            title.poster_path
              ? `https://image.tmdb.org/t/p/w500${title.poster_path}`
              : "/placeholder.png"
          }
          alt={name}
        />

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-2 pe-6">{name}</h2>
          <p className="text-sm">{title.overview || "Título sem sinopse..."}</p>
          <p className="text-sm mt-4 font-semibold">
            Release Date: <span className="font-normal">{releaseDate}</span>
          </p>
          <p className="text-sm font-semibold">
            Rating:{" "}
            <span className="font-normal">
              {Number(title.vote_average).toFixed(1)}
            </span>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
