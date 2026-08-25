import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onRemoveClick?: () => void;
};

function MovieCard({
  movie,
  isFavorite = false,
  onFavoriteClick,
  onRemoveClick,
}: MovieCardProps) {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : undefined;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-md">
      <div className="aspect-[2/3] bg-slate-800">
        {poster ? (
          <img
            src={poster}
            alt={`${movie.Title} poster`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-400">
            No poster available
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold text-white">
            {movie.Title}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {movie.Year} · {movie.Type}
          </p>
        </div>

        {onRemoveClick ? (
          <button
            type="button"
            onClick={onRemoveClick}
            className="w-full rounded-lg border border-red-500/40 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
          >
            Remove from favorites
          </button>
        ) : onFavoriteClick ? (
          <button
            type="button"
            onClick={onFavoriteClick}
            className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition ${
              isFavorite
                ? "border border-amber-500/40 bg-amber-500/10 text-amber-300"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            {isFavorite ? "Favorited" : "Add to favorites"}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default MovieCard;
