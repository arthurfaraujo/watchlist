"use client";

import { MdClose, MdStar } from "react-icons/md";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";

export default function MovieModal() {
  const { media, closeModal } = useModal();

  if (!media) return null;

  const imagePath = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "/placeholder.png";

  return (
    <div
      className="animate-slideUp fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}>
      <div
        className="h-96 flex gap-4 border border-neutral-700 bg-opacity-90 backdrop-blur-sm bg-neutral-800 p-4 pr-10 rounded-lg mx-4 max-w-screen-sm"
        onClick={(e) => e.stopPropagation()}>
        <MdClose
          className="text-xl absolute end-4 cursor-pointer text-neutral-300 hover:text-neutral-50 duration-100 hover:scale-110"
          onClick={closeModal}
        />
        <Image
          className="rounded w-64 h-full object-cover"
          src={imagePath}
          width={500}
          height={500}
          alt={(media.name || media.title)!}
        />
        <div className="flex flex-col justify-between">
          <div className="h-5/6 flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white">
              {media.title || media.name}
            </h2>
            <p className=" text-gray-300 text-sm overflow-auto">
              {media.overview || "Sem descrição disponível."}
            </p>
          </div>
          <div className="flex gap-4 text-xs mb-2">
            <p>
              {new Date(
                media.release_date || media.first_air_date + "T00:00:00"
              ).toLocaleDateString()}
            </p>
            <span className="flex items-center gap-1">
              <MdStar className="text-sm text-yellow-400" />
              {Number(media.vote_average).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
