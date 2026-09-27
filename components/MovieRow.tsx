// 'use client';

// import { Movie } from '@/lib/tmdb';
// import MovieCard from './MovieCard';
// import { useRef, useState } from 'react';

// interface MovieRowProps {
//   title: string;
//   movies: Movie[];
// }

// export default function MovieRow({ title, movies }: MovieRowProps) {
//   const rowRef = useRef<HTMLDivElement>(null);
//   const [isMoved, setIsMoved] = useState(false);

//   const handleClick = (direction: 'left' | 'right') => {
//     setIsMoved(true);

//     if (rowRef.current) {
//       const { scrollLeft, clientWidth } = rowRef.current;

//       const scrollTo =
//         direction === 'left'
//           ? scrollLeft - clientWidth
//           : scrollLeft + clientWidth;

//       rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="h-40 space-y-0.5 md:space-y-1 px-4 md:px-10 my-6">
//       <h2 className="w-56 cursor-pointer text-xs font-semibold text-gray-500 transition duration-200 hover:text-netflix-red md:text-lg">
//         {title}
//       </h2>
//       <div className="group relative md:-ml-2">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-black ${
//             !isMoved && 'hidden'
//           }`}
//           onClick={() => handleClick('left')}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//         </svg>

//         <div
//           ref={rowRef}
//           className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-2"
//         >
//           {movies.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>

//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="absolute top-0 bottom-0 right-2 z-40 m-auto h-7 w-7 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-black"
//           onClick={() => handleClick('right')}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//         </svg>
//       </div>
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }









'use client';

import { useRef, useState } from 'react';
import { Roboto } from 'next/font/google';
import { Movie } from '@/lib/tmdb';
import MovieCard from './MovieCard';

const googleFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll =
        direction === 'left'
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      rowRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section
      className={`${googleFont.className} my-8 px-4 sm:px-8 md:px-12 lg:px-16 antialiased select-none`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        
        {/* Row Header with Category Title and Arrow Controls */}
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-medium text-[#1f1f1f] tracking-tight">
            {title}
          </h2>

          {/* Top-Right Circular Navigation Pills */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-transparent ${
                canScrollLeft
                  ? 'bg-[#f1f3f4] text-[#1f1f1f] hover:bg-[#e8eaed] active:scale-95 cursor-pointer shadow-sm'
                  : 'bg-[#f8f9fa] text-[#bdc1c6] cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-transparent ${
                canScrollRight
                  ? 'bg-[#f1f3f4] text-[#1f1f1f] hover:bg-[#e8eaed] active:scale-95 cursor-pointer shadow-sm'
                  : 'bg-[#f8f9fa] text-[#bdc1c6] cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Track Container */}
        <div className="relative group">
          
          {/* Mobile Overlay Scroll Button (Left) */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous"
              className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 text-[#1f1f1f] shadow-md border border-[#dadce0] flex items-center justify-center active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Cards Track */}
          <div
            ref={rowRef}
            onScroll={checkScrollPosition}
            className="flex items-center gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-2 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} layout="row" />
            ))}
          </div>

          {/* Mobile Overlay Scroll Button (Right) */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next"
              className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 text-[#1f1f1f] shadow-md border border-[#dadce0] flex items-center justify-center active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

        </div>

      </div>
    </section>
  );
}