'use client';

import Image from 'next/image';
import { Movie, posterBaseUrl } from '@/lib/tmdb';
import { useMovieStore } from '@/store/movieStore';

interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'grid';
}

export default function MovieCard({ movie, layout = 'row' }: MovieCardProps) {
  const { setMovie, openModal } = useMovieStore();

  const handleOpen = () => {
    setMovie(movie);
    openModal();
  };

  return (
    <div 
      onClick={handleOpen}
      className={`relative cursor-pointer transition duration-300 ease-out hover:scale-105 shadow-sm hover:shadow-md rounded-xl overflow-hidden border border-gray-100 ${
        layout === 'row' 
          ? 'h-24 min-w-[160px] md:h-32 md:min-w-[240px]' 
          : 'aspect-video w-full'
      }`}
    >
      <Image
        src={`${posterBaseUrl}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title || movie.name || 'Movie Card'}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition duration-300 hover:opacity-100">
        <p className="text-[10px] font-medium text-white line-clamp-1 italic">
          {movie.title || movie.name}
        </p>
      </div>
    </div>
  );
}
