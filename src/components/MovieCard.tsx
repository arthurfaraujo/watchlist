import { MediaResponse } from "@/types/media";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { MdStar } from "react-icons/md";
import { useState } from "react";

export default function MovieCard({
  name,
  media,
}: {
  name: string;
  media: MediaResponse;
}) {
  const { openModal } = useModal();
  const [watchlistMarked, setWatchlistMarket] = useState(false);

  const imagePath = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "/placeholder.png";

  return (
    <>
      <div className="flex flex-col">
        <div
          onClick={() => openModal(media)}
          className="cursor-pointer relative w-56 h-80">
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
                  media.release_date || media.first_air_date + "T00:00:00"
                ).toLocaleDateString()}
              </p>
              {media.vote_average! > 0 && (
                <p className="flex gap-1 items-center">
                  <MdStar className="text-yellow-400 text-sm" />
                  <span>{Number(media.vote_average).toFixed(1)}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setWatchlistMarket(!watchlistMarked)}
          className={`${
            watchlistMarked ? "bg-green-600" : "bg-blue-700"
          } text-neutral-100 text-sm p-2 rounded-b w-full`}>
          Watchlist +
        </button>
      </div>
    </>
  );
}
