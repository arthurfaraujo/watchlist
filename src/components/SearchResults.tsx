import { MediaResponse } from "@/types/media";
import Image from "next/image";

export default function SearchResults({ data }: { data: MediaResponse[] }) {
  // const sortedData = data.sort(
  //   (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
  // );

  return (
    <>
      {data.map((media: MediaResponse) => {
        const imagePath =
          media.poster_path || media.profile_path
            ? `https://image.tmdb.org/t/p/w500${(media.profile_path ||
                media.poster_path)!}`
            : "/placeholder.png";

        // if (
        //   (media.media_type !== MediaType.person && !media.first_air_date) ||
        //   !media.release_date
        // ) {
        //   return;
        // }

        return (
          <div
            key={media.id}
            onClick={() => alert("Hello world")}
            className="cursor-pointer my-2 flex gap-1">
            <Image
              src={imagePath}
              alt={(media.title || media.name)!}
              width={500}
              height={500}
              className="shrink-0 rounded w-12 h-16 cursor-pointer rounded-t object-cover"
            />
            <div className="mx-1 flex justify-between w-full">
              <h1 className="text-sm">{(media.title || media.name)!}</h1>
              <p className="text-xs">
                {media.first_air_date || media.release_date}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
