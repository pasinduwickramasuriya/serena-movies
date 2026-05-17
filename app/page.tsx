'use client';

import { useEffect, useState } from 'react';
import { requests, getMovies, Movie } from '@/lib/tmdb';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import MovieCard from '@/components/MovieCard';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Home() {
  const [movies, setMovies] = useState<{ [key: string]: Movie[] }>({});
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      ] = await Promise.all([
        getMovies(requests.fetchNetflixOriginals),
        getMovies(requests.fetchTrending),
        getMovies(requests.fetchTopRated),
        getMovies(requests.fetchActionMovies),
        getMovies(requests.fetchComedyMovies),
        getMovies(requests.fetchHorrorMovies),
        getMovies(requests.fetchRomanceMovies),
        getMovies(requests.fetchDocumentaries),
      ]);

      setMovies({
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      });
      setLoading(false);
    };

    fetchAll();
  }, []);

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await getMovies(requests.fetchSearch(query));
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-white">
      <p className="text-netflix-red font-bold animate-pulse italic">Serena...</p>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar onSearch={handleSearch} />

      <main className="relative pb-24">
        {searchResults ? (
          <div className="pt-24 px-4 md:px-10">
            <h2 className="text-xl font-bold mb-6 text-black italic">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
              {searchResults.map((movie) => (
                <div key={movie.id} className="flex flex-col space-y-2">
                  <MovieCard movie={movie} layout="grid" />
                  <p className="text-xs text-gray-700 font-medium px-1 truncate">
                    {movie.title || movie.name}
                  </p>
                </div>
              ))}
            </div>
            {searchResults.length === 0 && (
              <p className="text-gray-400 text-sm">No results found for your search.</p>
            )}
          </div>
        ) : (
          <>
            <Hero netflixOriginals={movies.netflixOriginals} />

            <section className="space-y-4 md:space-y-12">
              <MovieRow title="Trending Now" movies={movies.trendingNow} />
              <MovieRow title="Top Rated" movies={movies.topRated} />
              <MovieRow title="Action Thrillers" movies={movies.actionMovies} />
              <MovieRow title="Comedies" movies={movies.comedyMovies} />
              <MovieRow title="Scary Movies" movies={movies.horrorMovies} />
              <MovieRow title="Romance" movies={movies.romanceMovies} />
              <MovieRow title="Documentaries" movies={movies.documentaries} />
            </section>
          </>
        )}
      </main>

      <Footer />

      <Modal />
    </div>
  );
}
