'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { IoBookmarkOutline } from 'react-icons/io5';
import { requests, getMovies, Movie } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import Modal from '@/components/Modal';

export default function MyListPage() {
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await getMovies(requests.fetchSearch(query));
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Navbar onSearch={handleSearch} />

      <main className="flex-grow flex flex-col items-center px-6 md:px-12 mt-20 pb-24">
        {searchResults ? (
          <div className="w-full max-w-7xl mx-auto">
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
          <div className="text-center flex flex-col items-center space-y-4 my-auto">
            <div className="h-24 w-24 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <IoBookmarkOutline className="h-10 w-10 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Your List is Empty</h1>
            <p className="text-sm text-neutral-500 max-w-sm">
              Add movies and TV shows to your list so you can easily find them later. They will appear here!
            </p>
            <a href="/" className="mt-8 px-8 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition shadow-md">
              Explore Content
            </a>
          </div>
        )}
      </main>

      <Footer />
      <Modal />
    </div>
  );
}
