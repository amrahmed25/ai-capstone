import { get, ref, remove, set } from "firebase/database";
import type { Movie } from "../types/movie";
import { database } from "./firebaseConfig";

function favoritesPath(userId: string) {
  return `users/${userId}/favorites`;
}

export async function addFavoriteMovie(
  userId: string,
  movie: Movie,
): Promise<void> {
  try {
    await set(ref(database, `${favoritesPath(userId)}/${movie.imdbID}`), movie);
  } catch {
    throw new Error("Failed to save favorite movie");
  }
}

export async function removeFavoriteMovie(
  userId: string,
  imdbId: string,
): Promise<void> {
  try {
    await remove(ref(database, `${favoritesPath(userId)}/${imdbId}`));
  } catch {
    throw new Error("Failed to remove favorite movie");
  }
}

export async function getFavorites(userId: string): Promise<Movie[]> {
  try {
    const snapshot = await get(ref(database, favoritesPath(userId)));

    if (!snapshot.exists()) {
      return [];
    }

    return Object.values(snapshot.val() as Record<string, Movie>);
  } catch {
    throw new Error("Failed to load favorite movies");
  }
}
