'use client'

import { MediaResponse } from "@/types/media";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { MdStar } from "react-icons/md";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import storage from "@/services/databaseService"

export default function MovieCard({
  name,
  media,
  watchlistCard = false
}: Readonly<{
  name: string;
  media: MediaResponse;
  watchlistCard: boolean;
}>) {
  const { openModal } = useModal();
  const [watchlistMarked, setWatchlistMarked] = useState(false);
  const { user } = useAuth()
  const imagePath = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "/placeholder.png";

  async function addMovieToWatchlist() {
    await storage.create({id: media.id, type: media.media_type, watchlistId: user!.id }, 'media')
  }
  
  return (
    <div className="flex flex-col w-24 sm:w-40 lg:w-56">
      <div onClick={() => openModal(media)} className="cursor-pointer relative">
        <Image
          id="movie-img"
          src={imagePath}
          alt={name}
          width={500}
          height={500}
          className="cursor-pointer rounded-t w-full h-36 sm:h-56 lg:h-80 object-cover"
        />
        <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white">
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
      {!watchlistCard && <button
        onClick={() => {
          if (user?.id) setWatchlistMarked(is => !is)
        }}
        className={`${
          watchlistMarked
            ? "hover:bg-green-500 bg-green-600"
            : "hover:bg-blue-600 bg-blue-700"
        } text-neutral-100  text-sm p-2 rounded-b w-full`}>
        Watchlist +
      </button>}
      
    </div>
  );
}
