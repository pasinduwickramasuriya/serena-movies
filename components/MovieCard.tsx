'use client';

import Image from 'next/image';
import { Roboto } from 'next/font/google';
import { Movie, posterBaseUrl } from '@/lib/tmdb';
import { useMovieStore } from '@/store/movieStore';

const googleFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

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

  const imagePath = movie.backdrop_path || movie.poster_path;
  const imageUrl = imagePath ? `${posterBaseUrl}${imagePath}` : '';

  return (
    <div
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      className={`${googleFont.className} group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#dadce0] bg-[#f1f3f4] transition-all duration-300 ease-out hover:border-[#bdc1c6] hover:shadow-[0_4px_16px_rgba(60,64,67,0.15)] hover:scale-[1.03] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] shrink-0 ${
        layout === 'row'
          ? 'h-28 min-w-[190px] sm:h-36 sm:min-w-[240px] md:h-44 md:min-w-[280px]'
          : 'aspect-video w-full'
      }`}
    >
      {/* Movie Media Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={movie.title || movie.name || 'Movie thumbnail'}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 320px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#f1f3f4] text-[14px] font-medium text-[#5f6368]">
          No Image
        </div>
      )}

      {/* Google-Style Subtle Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Bottom Floating Information Pill / Title */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 sm:p-3.5 opacity-0 transition-all duration-300 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
        
        {/* Title */}
        <p className="text-[14px] sm:text-[15px] font-medium text-white line-clamp-1 leading-tight tracking-normal drop-shadow-sm">
          {movie.title || movie.name}
        </p>

        {/* Small Google Pill Quick-Play Badge */}
        <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/95 text-[#1f1f1f] shadow-md backdrop-blur-xs transition-transform group-hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3.5 h-3.5 ml-0.5"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}