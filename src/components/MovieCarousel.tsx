"use client";

import { MediaResponse } from "@/types/media";
import MovieCard from "./MovieCard";
import {
  MdKeyboardArrowLeft as MdArrowLeft,
  MdKeyboardArrowRight as MdArrowRight,
} from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export default function MovieCarousel({
  carouselTitle,
  mediaResponses,
}: Readonly<{
  carouselTitle: string;
  mediaResponses: MediaResponse[];
}>) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Referência para cada MovieCard
  const [index, setIndex] = useState<number>(0);

  const getVisibleCount = () => {
    if (!scrollContainerRef.current || !cardRefs.current[0]) return 1;
    const containerWidth = scrollContainerRef.current.clientWidth;
    const cardWidth = cardRefs.current[0].offsetWidth;
    return Math.max(Math.floor(containerWidth / cardWidth), 1); // Pelo menos 1
  };

  const scrollToElement = (index: number) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleScrollLeft = () => {
    setIndex((prevIndex) => {
      const visibleCount = getVisibleCount();
      const newIndex =
        (prevIndex - visibleCount + mediaResponses.length) %
        mediaResponses.length;

      scrollToElement(newIndex);
      return newIndex;
    });
  };

  const handleScrollRight = () => {
    setIndex((prevIndex) => {
      const visibleCount = getVisibleCount();
      const newIndex = (prevIndex + visibleCount) % mediaResponses.length;

      scrollToElement(newIndex);
      return newIndex;
    });
  };

  useEffect(() => {
    console.log(index);
    console.log(mediaResponses.length);
  }, [index, mediaResponses.length]);

  return (
    <div>
      <h1 className="border-b border-neutral-700 text-lg font-bold mb-3">
        {carouselTitle}
      </h1>
      <div className="relative flex items-center">
        <button
          onClick={handleScrollLeft}
          className="p-1 hover:scale-110 active:scale-100 transition ease duration-75 border border-transparent hover:border-neutral-300 absolute z-10 backdrop-blur top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50">
          <MdArrowLeft className="text-4xl" />
        </button>
        <div ref={scrollContainerRef} className="overflow-hidden flex">
          <div className="flex gap-4">
            {mediaResponses.map((media, index) => {
              if (!media.poster_path) return;
              return (
                <div
                  key={media.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}>
                  <MovieCard
                    name={(media.name || media.title)!}
                    media={media}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleScrollRight}
          className="p-1 hover:scale-110 active:scale-100 transition ease duration-75 border border-transparent hover:border-neutral-300 absolute z-10 backdrop-blur right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50">
          <MdArrowRight className="text-4xl" />
        </button>
      </div>
    </div>
  );
}
