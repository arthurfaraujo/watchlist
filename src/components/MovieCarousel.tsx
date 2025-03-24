"use client";

import { MediaResponse } from "@/types/media";
import MovieCard from "./MovieCard";

export default function MovieCarousel({
  carouselTitle,
  mediaResponses,
}: Readonly<{
  carouselTitle: string;
  mediaResponses: MediaResponse[];
}>) {
  return (
    <div>
      <h1 className="border-b border-neutral-700 text-lg font-bold mb-3">
        {carouselTitle}
      </h1>
      <div className="pb-6 overflow-scroll">
        <div className="flex gap-4">
          {mediaResponses.map((media) => {
            if (media.id === "1235619") {
              console.log(media);
            }
            if (!media.poster_path) return;

            return (
              <MovieCard
                key={media.id}
                name={(media.name || media.title)!}
                media={media}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
