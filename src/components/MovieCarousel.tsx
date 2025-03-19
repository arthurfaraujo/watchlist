"use client";

import { MediaResponse } from "@/types/media";
import MovieCard from "./MovieCard";

export default function MovieCarousel({
  carouselTitle,
  mediaResponses,
}: {
  carouselTitle: string;
  mediaResponses: MediaResponse[];
}) {
  return (
    <div className="overflow-scroll">
      <h1 className="border-b border-neutral-700 text-lg font-bold mb-3">
        {carouselTitle}
      </h1>
      <div className="flex gap-4">
        {mediaResponses.map((media) => {
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
  );
}
