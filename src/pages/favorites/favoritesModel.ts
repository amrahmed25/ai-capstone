import {
  addFavoriteMovie,
  getFavorites,
  removeFavoriteMovie,
} from "../../services/firebaseService";
import type { Movie } from "../../types/movie";

export async function loadFavorites(userId: string): Promise<Movie[]> {
  return getFavorites(userId);
}

export async function saveFavorite(userId: string, movie: Movie): Promise<void> {
  await addFavoriteMovie(userId, movie);
}

export async function deleteFavorite(
  userId: string,
  imdbId: string,
): Promise<void> {
  await removeFavoriteMovie(userId, imdbId);
}
