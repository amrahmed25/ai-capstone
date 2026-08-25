import type { Movie, OMDbSearchResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = import.meta.env.VITE_OMDB_API_URL ?? "https://www.omdbapi.com/";

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = new URL(API_URL);
  url.searchParams.set("apikey", API_KEY ?? "");
  url.searchParams.set("s", query);
  url.searchParams.set("type", "movie");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Movie search failed (${response.status})`);
  }

  const data = (await response.json()) as OMDbSearchResponse;

  if (data.Response === "False") {
    throw new Error(data.Error ?? "Movie search returned no results");
  }

  return data.Search ?? [];
}
