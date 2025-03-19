import { MediaResponse } from "@/types/media";

export default function MovieModal({
  media,
  onClose,
}: {
  media: MediaResponse;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold text-white">
          {media.title || media.name}
        </h2>
        <p className="text-gray-300">{media.overview}</p>
        <button
          className="mt-4 bg-red-500 px-4 py-2 text-white rounded"
          onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
