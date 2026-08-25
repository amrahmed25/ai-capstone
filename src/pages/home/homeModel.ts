import { searchMovies } from "../../services/omdbMovieService";
import type { Movie } from "../../types/movie";

const SEED_KEYWORDS = [
  "Batman",
  "Avengers",
  "Harry Potter",
  "Matrix",
  "Star Wars",
  "Spider",
  "Inception",
  "Joker",
  "Frozen",
  "Alien",
];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export async function getMovies(query: string): Promise<Movie[]> {
  const cleanedQuery = query.trim();

  if (cleanedQuery.length < 2) {
    throw new Error("Search query must contain at least two characters");
  }

  return searchMovies(cleanedQuery);
}

export async function getInitialMovies(): Promise<Movie[]> {
  const selectedKeywords = shuffle(SEED_KEYWORDS).slice(0, 5);
  const results = await Promise.all(
    selectedKeywords.map((keyword) => searchMovies(keyword)),
  );

  const uniqueMovies = new Map<string, Movie>();

  for (const movies of results) {
    for (const movie of movies) {
      uniqueMovies.set(movie.imdbID, movie);
    }
  }

  return shuffle([...uniqueMovies.values()]).slice(0, 20);
}
