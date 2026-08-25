import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Movie } from "../../types/movie";
import { deleteFavorite, loadFavorites } from "./favoritesModel";

export function useFavoritesViewModel() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const movies = await loadFavorites(user.uid);
      setFavorites(movies);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Failed to load favorites";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void loadMovies();
  }, [loadMovies]);

  async function removeMovie(imdbId: string) {
    if (!user) {
      return;
    }

    setFavorites((current) =>
      current.filter((movie) => movie.imdbID !== imdbId),
    );

    try {
      await deleteFavorite(user.uid, imdbId);
    } catch (requestError) {
      await loadMovies();
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Failed to remove favorite";
      setError(message);
    }
  }

  return {
    favorites,
    loading,
    error,
    loadMovies,
    removeMovie,
  };
}
