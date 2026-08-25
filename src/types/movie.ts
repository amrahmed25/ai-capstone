export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

export type OMDbSearchResponse = {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
};
