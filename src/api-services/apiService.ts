import axios from "axios";
import { TMDBResponse } from "@/types/media";

class ApiService {
  private static readonly apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
  private static readonly baseUrl = "https://api.themoviedb.org/3/";

  /** Procura por filmes, series e pessoas */
  static async searchMulti(query: string): Promise<TMDBResponse> {
    return this.request("search/multi", { query });
  }

  /** Procura por filmes */
  static async searchMovies(query: string): Promise<TMDBResponse> {
    return this.request("search/movie", { query });
  }

  /** Procura por pessoas */
  static async searchPeople(query: string): Promise<TMDBResponse> {
    return this.request("search/person", { query });
  }

  /** Procura por series */
  static async searchTvShows(query: string): Promise<TMDBResponse> {
    return this.request("search/tv", { query });
  }

  static async getPersonById(id: string): Promise<TMDBResponse> {
    return this.request(`person/${id}`);
  }

  /** Procura por um filme usando o id */
  static async getMovieById(id: string): Promise<TMDBResponse> {
    return this.request(`movie/${id}`);
  }

  /** Procura por uma serie usando o id */
  static async getTvShowById(id: string) {
    return this.request(`tv/${id}`);
  }

  /** Pega filmes e series que estão em alta no momento */
  static async getTrendingAll(): Promise<TMDBResponse> {
    return this.request("trending/all/week");
  }

  /** Pega filmes que estão em alta no momento */
  static async getTrendingMovies(): Promise<TMDBResponse> {
    return this.request("trending/movie/week");
  }

  /** Pega series que estão em alta no momento */
  static async getTrendingTvShows(): Promise<TMDBResponse> {
    return this.request("trending/tv/week");
  }

  static async getMoviesByCategory(category: string): Promise<TMDBResponse> {
    return this.request("discover/movie", { with_genres: category });
  }

  static async getTvByCategory(category: string): Promise<TMDBResponse> {
    return this.request("discover/tv", { with_genres: category });
  }

  private static async request(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<TMDBResponse> {
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
