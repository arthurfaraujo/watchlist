import axios from "axios";
import { MediaResponse, SearchResponse } from "@/types/media";

class ApiService {
  private static readonly apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
  private static readonly baseUrl = "https://api.themoviedb.org/3/";

  /** Procura por filmes, series e pessoas */
  static async searchMulti(query: string): Promise<SearchResponse> {
    return this.request("search/multi", { query }) as Promise<SearchResponse>;
  }

  /** Procura por filmes */
  static async searchMovies(query: string): Promise<SearchResponse> {
    return this.request("search/movie", { query }) as Promise<SearchResponse>;
  }

  /** Procura por pessoas */
  static async searchPeople(query: string): Promise<SearchResponse> {
    return this.request("search/person", { query }) as Promise<SearchResponse>;
  }

  /** Procura por series */
  static async searchTvShows(query: string): Promise<SearchResponse> {
    return this.request("search/tv", { query }) as Promise<SearchResponse>;
  }

  static async getPersonById(id: string): Promise<MediaResponse> {
    return this.request(`person/${id}`) as Promise<MediaResponse>;
  }

  /** Procura por um filme usando o id */
  static async getMovieById(id: string): Promise<MediaResponse> {
    return this.request(`movie/${id}`) as Promise<MediaResponse>;
  }

  /** Procura por uma serie usando o id */
  static async getTvShowById(id: string): Promise<MediaResponse> {
    return this.request(`tv/${id}`) as Promise<MediaResponse>;
  }

  /** Pega filmes e series que estão em alta no momento */
  static async getTrendingAll(): Promise<SearchResponse> {
    return this.request("trending/all/week") as Promise<SearchResponse>;
  }

  /** Pega filmes que estão em alta no momento */
  static async getTrendingMovies(): Promise<SearchResponse> {
    return this.request("trending/movie/week") as Promise<SearchResponse>;
  }

  /** Pega series que estão em alta no momento */
  static async getTrendingTvShows(): Promise<SearchResponse> {
    return this.request("trending/tv/week") as Promise<SearchResponse>;
  }

  static async getMoviesByCategory(category: string): Promise<SearchResponse> {
    return this.request("discover/movie", {
      with_genres: category,
    }) as Promise<SearchResponse>;
  }

  static async getTvByCategory(category: string): Promise<SearchResponse> {
    return this.request("discover/tv", {
      with_genres: category,
    }) as Promise<SearchResponse>;
  }

  private static async request(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<SearchResponse | MediaResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          language: "pt-BR",
          ...params,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Erro: ${error.response?.status} - ${error.response?.statusText}`
        );
      } else if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido");
    }
  }
}

export default ApiService;
