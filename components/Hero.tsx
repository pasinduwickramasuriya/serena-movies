// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Movie, imageBaseUrl } from '@/lib/tmdb';
// import { useMovieStore } from '@/store/movieStore';

// interface HeroProps {
//   netflixOriginals: Movie[];
// }

// export default function Hero({ netflixOriginals }: HeroProps) {
//   const [movie, setMovieState] = useState<Movie | null>(null);
//   const { setMovie, openModal } = useMovieStore();

//   useEffect(() => {
//     const selectedMovie = netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];
//     console.log('Selected Hero Movie:', selectedMovie);
//     setMovieState(selectedMovie);
//   }, [netflixOriginals]);

//   const handlePlay = () => {
//     if (movie) {
//       setMovie(movie);
//       openModal(true);
//     }
//   };

//   if (!movie) return null;

//   return (
//     <div className="relative flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[80vh] lg:justify-end lg:pb-12 overflow-hidden">
//       <div className="absolute top-0 left-0 z-0 h-full w-full">
//         <Image
//           src={`${imageBaseUrl}${movie?.backdrop_path || movie?.poster_path}`}
//           alt={movie?.title || movie?.name || 'Featured Movie'}
//           fill
//           className="object-cover"
//           priority
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
//       </div>

//       <div className="relative z-10 px-4 md:px-10">
//         <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-black tracking-tight">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>
//         <p className="max-w-xs text-[10px] md:max-w-md md:text-xs lg:max-w-lg lg:text-sm text-black font-medium leading-relaxed mt-2 opacity-80">
//           {movie?.overview}
//         </p>

//         <div className="flex space-x-2 pt-4">
//           <button
//             onClick={handlePlay}
//             className="bannerButton bg-black text-white hover:bg-gray-800 shadow-sm"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="h-3 w-3 text-white md:h-4 md:w-4"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             PLAY
//           </button>

//           <button className="bannerButton bg-white border border-black/10 text-black hover:bg-gray-50">
//             DETAILS
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .bannerButton {
//           display: flex;
//           align-items: center;
//           gap: 0.35rem;
//           border-radius: 9999px;
//           padding: 0.4rem 1.2rem;
//           font-size: 0.75rem;
//           font-weight: 600;
//           transition: all 0.2s;
//           cursor: pointer;
//         }
//         @media (min-width: 768px) {
//           .bannerButton {
//             padding: 0.5rem 1.5rem;
//             font-size: 0.8rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }








'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Movie, imageBaseUrl } from '@/lib/tmdb';
import { useMovieStore } from '@/store/movieStore';

interface HeroProps {
  netflixOriginals: Movie[];
}

export default function Hero({ netflixOriginals }: HeroProps) {
  const [movie, setMovieState] = useState<Movie | null>(null);
  const { setMovie, openModal } = useMovieStore();

  useEffect(() => {
    if (netflixOriginals && netflixOriginals.length > 0) {
      const selectedMovie = netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];
      console.log('Selected Hero Movie:', selectedMovie);
      setMovieState(selectedMovie);
    }
  }, [netflixOriginals]);

  const handlePlay = () => {
    if (movie) {
      setMovie(movie);
      openModal(true);
    }
  };

  if (!movie) return null;

  const imagePath = movie.backdrop_path || movie.poster_path;
  const fullImageUrl = imagePath ? `${imageBaseUrl}${imagePath}` : '';

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center p-4 md:p-10 overflow-hidden bg-neutral-950">

      {/* Immersive True Full Screen Background Image Layer */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {fullImageUrl ? (
          <Image
            src={fullImageUrl}
            alt={movie.title || movie.name || 'Featured Movie'}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        ) : (
          <div className="w-full h-full bg-neutral-950" />
        )}

        {/* Deep, rich dark vignette overlay layer to ensure clear text contrast */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px] z-10" />
      </div>

      {/* Center Aligned Content Stack Layer */}
      <div className="relative z-20 flex flex-col items-center text-center space-y-4 max-w-2xl w-full mx-auto">

        {/* Movie Title (Background removed, added crisp text-shadow) */}
        {/* <h1
          className="text-3xl font-black md:text-5xl lg:text-6xl text-white tracking-tight leading-none select-none  drop-shadow-lg"
          style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)' }}
        >
          {movie.title || movie.name || movie.original_name}
        </h1> */}
        <h1
          className="text-lg font-medium md:text-2xl lg:text-3xl text-white tracking-[0.2em] leading-relaxed select-none uppercase drop-shadow-md"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
        >
          {movie.title || movie.name || movie.original_name}
        </h1>

        {/* Movie Overview Description (Background removed) */}
        {movie.overview && (
          <p
            className="text-xs md:text-sm lg:text-base text-neutral-200 font-medium leading-relaxed max-w-xl line-clamp-3 md:line-clamp-4 select-none drop-shadow"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
          >
            {movie.overview}
          </p>
        )}

        {/* Action Button Controls Row */}
        <div className="flex items-center justify-center space-x-3 pt-4">
          <button
            onClick={handlePlay}
            className="bannerButton bg-white text-black hover:bg-neutral-200 shadow-xl active:scale-95 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-black"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
            PLAY NOW
          </button>

          {/* <button className="bannerButton bg-neutral-800/60 backdrop-blur-md border border-neutral-700 text-white hover:bg-neutral-700 shadow-xl active:scale-95 transition-all">
            MORE DETAILS
          </button> */}
        </div>
      </div>

      {/* Custom Styled JSX Parameters for Clean Button Layouts */}
      <style jsx>{`
        /* Interactive Action Buttons Capsule Formatting */
        .bannerButton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 9999px;
          padding: 0.6rem 1.8rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .bannerButton {
            padding: 0.75rem 2.4rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}