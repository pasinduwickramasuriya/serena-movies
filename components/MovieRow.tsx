'use client';

import { Movie } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import { useRef, useState } from 'react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-1 px-4 md:px-10 my-6">
      <h2 className="w-56 cursor-pointer text-xs font-semibold text-gray-500 transition duration-200 hover:text-netflix-red md:text-lg">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-black ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

        <div
          ref={rowRef}
          className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-black"
          onClick={() => handleClick('right')}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
