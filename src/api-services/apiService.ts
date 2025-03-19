class ApiService {
  /** Procura por filmes, series e pessoas */
  async searchMulti(query: string) {
    return this.request("search/multi", { query });
  }

  /** Procura por filmes */
  async searchMovies(query: string) {
    return this.request("search/movie", { query });
  }

  /** Procura por pessoas */
  async searchPeople(query: string) {
    return this.request("search/person", { query });
  }

  /** Procura por series */
  async searchTvShows(query: string) {
    return this.request("search/tv", { query });
  }

  async getPersonById(id: string) {
    return this.request(`person/${id}`);
  }

  /** Procura por um filme usando o id */
  async getMovieById(id: string) {
    return this.request(`movie/${id}`);
  }

  /** Procura por uma serie usando o id */
  async getTvShowById(id: string) {
    return this.request(`tv/${id}`);
  }

  /** Pega filmes e series que estão em alta no momento */
  async getTrendingAll() {
    return this.request("trending/all/week");
  }

  /** Pega filmes que estão em alta no momento */
  async getTrendingMovies() {
    return this.request("trending/movie/week");
  }

  /** Pega series que estão em alta no momento */
  async getTrendingTvShows() {
    return this.request("trending/tv/week");
  }

  async getMoviesByCategory(category: string) {
    return this.request("discover/movie", { with_genres: category });
  }

  async getTvByCategory(category: string) {
    return this.request("discover/tv", { with_genres: category });
  }

  private readonly apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
  private readonly baseUrl = "https://api.themoviedb.org/3/";

  private async request(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    // Adicionando os parametros default
    url.searchParams.set("api_key", this.apiKey);
    url.searchParams.set("language", "pt-BR");

    // Adicionando novos parametros (como query ou page)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    // Fazer a requisição
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }
}

export default ApiService;
