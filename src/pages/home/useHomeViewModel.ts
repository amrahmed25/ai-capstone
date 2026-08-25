import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addFavoriteMovie, getFavorites } from "../../services/firebaseService";
import type { Movie } from "../../types/movie";
import { getInitialMovies, getMovies } from "./homeModel";

export function useHomeViewModel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInitialMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    setQuery("");

    try {
      const initialMovies = await getInitialMovies();
      setMovies(initialMovies);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Failed to load movies";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInitialMovies();
  }, [loadInitialMovies]);

  useEffect(() => {
    async function loadFavoriteIds() {
      if (!user) {
        setFavoriteIds(new Set());
        return;
      }

      try {
        const favorites = await getFavorites(user.uid);
        setFavoriteIds(new Set(favorites.map((movie) => movie.imdbID)));
      } catch {
        setFavoriteIds(new Set());
      }
    }

    void loadFavoriteIds();
  }, [user]);

  async function handleSearch() {
    setLoading(true);
    setError(null);

    try {
      const results = await getMovies(query);
      setMovies(results);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Search failed";
      setError(message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleFavoriteClick(movie: Movie) {
    if (!user) {
      navigate("/auth");
      return;
    }

    setFavoriteIds((current) => new Set(current).add(movie.imdbID));

    try {
      await addFavoriteMovie(user.uid, movie);
    } catch {
      setFavoriteIds((current) => {
        const next = new Set(current);
        next.delete(movie.imdbID);
        return next;
      });
    }
  }

  return {
    query,
    setQuery,
    movies,
    favoriteIds,
    loading,
    error,
    handleSearch,
    handleFavoriteClick,
    loadInitialMovies,
  };
}
