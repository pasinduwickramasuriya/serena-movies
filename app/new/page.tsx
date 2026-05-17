'use client';

import { useEffect, useState } from 'react';
import { requests, getMovies, Movie } from '@/lib/tmdb';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function NewReleasesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      // Fetch trending and top rated for "new and trending"
      const [trending, topRated] = await Promise.all([
        getMovies(requests.fetchTrending),
        getMovies(requests.fetchTopRated),
      ]);
      
      // Merge and deduplicate
      const allMovies = [...trending, ...topRated];
      const uniqueMovies = Array.from(new Map(allMovies.map(item => [item.id, item])).values());
      
      setMovies(uniqueMovies);
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

      <main className="relative pb-24 pt-28 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
        {searchResults ? (
          <div>
            <h2 className="text-xl font-bold mb-6 text-black italic">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
              {searchResults.map((movie) => (
                <div key={movie.id} className="flex flex-col space-y-2">
                  <MovieCard movie={movie} layout="grid" />
                  <p className="text-xs text-neutral-700 font-medium px-1 truncate">
                    {movie.title || movie.name}
                  </p>
                </div>
              ))}
            </div>
            {searchResults.length === 0 && (
              <p className="text-neutral-400 text-sm mt-4">No results found for your search.</p>
            )}
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8 text-neutral-900 tracking-tight">New & Trending Releases</h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
              {movies.map((movie) => (
                <div key={movie.id} className="flex flex-col space-y-2">
                  <MovieCard movie={movie} layout="grid" />
                  <p className="text-xs text-neutral-700 font-medium px-1 truncate">
                    {movie.title || movie.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
      <Modal />
    </div>
  );
}
