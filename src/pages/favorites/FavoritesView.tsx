import MovieCard from "../../components/MovieCard";
import { useFavoritesViewModel } from "./useFavoritesViewModel";

function FavoritesView() {
  const { favorites, loading, error, removeMovie } = useFavoritesViewModel();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Favorite Movies</h1>
        <p className="mt-1 text-sm text-slate-400">
          Movies saved to your profile.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-300">Loading favorites...</p>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      {!loading && !error && favorites.length === 0 ? (
        <p className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-6 text-slate-400">
          No favorites yet. Browse the home page and add movies you love.
        </p>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onRemoveClick={() => void removeMovie(movie.imdbID)}
          />
        ))}
      </div>
    </section>
  );
}

export default FavoritesView;
