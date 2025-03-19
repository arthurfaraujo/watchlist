import { MediaResponse } from "@/types/media";
import Image from "next/image";

export default function MovieCard({
  name,
  media,
}: {
  name: string;
  media: MediaResponse;
}) {
  const imagePath = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "/placeholder.png";

  return (
    <div className="flex flex-col">
      <div className="relative w-56 h-80">
        <Image
          id="movie-img"
          src={imagePath}
          alt={name}
          width={500}
          height={500}
          className="cursor-pointer rounded-t w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white">
          <h3 className="text-sm font-bold">{name}</h3>
          <div className="text-xs flex items-center justify-between">
            <p>
              {new Date(
                media.release_date
                  ? media.release_date
                  : media.first_air_date + "T00:00:00"
              ).toLocaleDateString()}
            </p>
            <p className="flex gap-1 items-center">
              <svg
                className="text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"
                />
              </svg>
              <span>{Number(media.vote_average).toFixed(1)}</span>
            </p>
          </div>
        </div>
      </div>
      <button className="bg-blue-700 text-neutral-100 text-sm p-2 rounded-b w-full">
        Watchlist +
      </button>
    </div>
  );
}
