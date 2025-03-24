import { MediaResponse } from "@/types/media";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";

export default function SearchResults({ data }: { data: MediaResponse[] }) {
  const { openModal } = useModal();

  return (
    <>
      {data.map((media: MediaResponse) => {
        const imagePath =
          media.poster_path || media.profile_path
            ? `https://image.tmdb.org/t/p/w500${(media.profile_path ||
                media.poster_path)!}`
            : "/placeholder.png";

        return (
          <div
            key={media.id}
            onClick={() => openModal(media)}
            className="cursor-pointer my-2 flex gap-1">
            <Image
              src={imagePath}
              alt={(media.title || media.name)!}
              width={500}
              height={500}
              className="shrink-0 rounded w-8 h-12 sm:w-12 sm:h-16 cursor-pointer rounded-t object-cover"
            />
            <div className="mx-1 flex gap-2 justify-between w-full">
              <h1 className="text-xs md:text-sm">
                {(media.title || media.name)!}
              </h1>
              <p className="text-xs font-normal md:font-bold">
                {new Date(
                  media.release_date || media.first_air_date + "T00:00:00"
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
