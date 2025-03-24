import ApiService from "@/api-services/apiService";
import MovieCarousel from "@/components/MovieCarousel";

export default async function Home() {
  return (
    <main className="max-w-screen-xl xl:mx-auto mx-8 mt-8 flex flex-col gap-12">
      <MovieCarousel
        carouselTitle="Em Alta"
        mediaResponses={(await ApiService.getTrendingAll()).results}
      />
      <MovieCarousel
        carouselTitle="Filmes em alta"
        mediaResponses={(await ApiService.getTrendingMovies()).results}
      />
      <MovieCarousel
        carouselTitle="Series em alta"
        mediaResponses={(await ApiService.getTrendingTvShows()).results}
      />
      <MovieCarousel
        carouselTitle="Filmes de comédia"
        mediaResponses={(await ApiService.getMoviesByCategory("35")).results}
      />
      <MovieCarousel
        carouselTitle="Filmes de Terror"
        mediaResponses={(await ApiService.getMoviesByCategory("27")).results}
      />
      <MovieCarousel
        carouselTitle="Séries de Drama"
        mediaResponses={(await ApiService.getMoviesByCategory("18")).results}
      />
    </main>
  );
}
