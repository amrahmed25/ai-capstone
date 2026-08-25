import MovieCard from "../../components/MovieCard";
import type { Movie } from "../../types/movie";

type HomeViewProps = {
  movies: Movie[];
  favoriteIds: Set<string>;
  loading: boolean;
  error: string | null;
  onFavoriteClick: (movie: Movie) => void;
};

function HomeView({
  movies,
  favoriteIds,
  loading,
  error,
  onFavoriteClick,
}: HomeViewProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Discover Movies</h1>
        <p className="mt-1 text-sm text-slate-400">
          Browse a random selection or search the OMDB catalog.
        </p>
      </div>

      {loading ? <p className="text-slate-300">Loading movies...</p> : null}

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

      {!loading && !error && movies.length === 0 ? (
        <p className="text-slate-400">No movies found.</p>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favoriteIds.has(movie.imdbID)}
            onFavoriteClick={() => onFavoriteClick(movie)}
          />
        ))}
      </div>
    </section>
  );
}

export default HomeView;
