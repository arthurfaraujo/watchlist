export enum MediaType {
  movie = "movie",
  series = "tv",
  person = "person",
}

export interface MediaResponse {
  id: string;
  title?: string;
  name?: string;
  media_type: MediaType;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  first_air_date?: string;
  profile_path?: string;
  popularity: number;
  overview: string;
}
