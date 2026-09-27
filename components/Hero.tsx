'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import { Movie, imageBaseUrl } from '@/lib/tmdb';
import { useMovieStore } from '@/store/movieStore';

// Clean Google-style Sans font configuration
const googleFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

interface HeroProps {
  netflixOriginals: Movie[];
}

export default function Hero({ netflixOriginals = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { setMovie, openModal } = useMovieStore();

  // Pick a random movie on initial load
  useEffect(() => {
    if (netflixOriginals.length > 0) {
      const randomIndex = Math.floor(Math.random() * netflixOriginals.length);
      setCurrentIndex(randomIndex);
    }
  }, [netflixOriginals]);

  // Helper to pick a completely random next movie (different from current)
  const getRandomIndex = () => {
    if (netflixOriginals.length <= 1) return 0;
    let nextIdx = currentIndex;
    while (nextIdx === currentIndex) {
      nextIdx = Math.floor(Math.random() * netflixOriginals.length);
    }
    return nextIdx;
  };

  // Automatically cycle to a random movie every 6 seconds (pauses while hovered)
  useEffect(() => {
    if (netflixOriginals.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let nextIdx = Math.floor(Math.random() * netflixOriginals.length);
        if (nextIdx === prev) {
          nextIdx = (prev + 1) % netflixOriginals.length;
        }
        return nextIdx;
      });
    }, 6000); // 6-second timer

    return () => clearInterval(interval);
  }, [netflixOriginals, isHovered]);

  if (!netflixOriginals || netflixOriginals.length === 0) return null;

  const currentMovie = netflixOriginals[currentIndex] || netflixOriginals[0];

  const handleNext = () => {
    setCurrentIndex(getRandomIndex());
  };

  const handlePrev = () => {
    setCurrentIndex(getRandomIndex());
  };

  const handlePlay = (movieToPlay: Movie) => {
    setMovie(movieToPlay);
    openModal(true);
  };

  const getImageUrl = (item: Movie, preferPoster = false) => {
    const path = preferPoster
      ? item.poster_path || item.backdrop_path
      : item.backdrop_path || item.poster_path;
    return path ? `${imageBaseUrl}${path}` : '';
  };

  // 3 preview thumbnails
  const upcomingPreviews = [1, 2, 3].map((offset) => {
    const index = (currentIndex + offset) % netflixOriginals.length;
    return { movie: netflixOriginals[index], index };
  });

  const mainImageUrl = getImageUrl(currentMovie);

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // className={`${googleFont.className} w-full bg-white text-[#1f1f1f] pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden antialiased`}
      className={`${googleFont.className} w-full bg-white text-[#1f1f1f] pt-30 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden antialiased`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:gap-10">

        {/* Top Centered Headline */}
        <div className="w-full text-center pb-2">
          <h1
            className="inline text-center [text-wrap:pretty] [overflow-wrap:break-word] antialiased"
            style={{
              fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '56px',
              letterSpacing: '-1px',
              color: '#1f1f1f',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            Serena Movies
          </h1>
          <p className="text-[18px] text-[#5f6368] font-semibold line-clamp-3 leading-relaxed w-full">
            Enjoy a seamless movie streaming experience with a wide collection of movies and entertainment. Browse popular titles, discover new favorites, explore different genres, and enjoy your entertainment anytime, anywhere.
          </p>
        </div>

        {/* Top Cards Showcase: Reduced main card width with generous pill container */}
        <div className="flex items-stretch gap-2.5 sm:gap-4 md:gap-6 w-full h-[260px] xs:h-[300px] sm:h-[380px] md:h-[430px] lg:h-[480px]">

          {/* Main Card: Compact width with smooth cross-fade animation */}
          <div className="relative w-[48%] xs:w-[50%] sm:w-[52%] md:w-[54%] h-full rounded-[22px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-[#f1f3f4] border border-[#e0e2e5] group shadow-sm shrink-0">
            {mainImageUrl ? (
              <Image
                key={currentMovie.id || currentIndex}
                src={mainImageUrl}
                alt={currentMovie.title || currentMovie.name || 'Featured Movie'}
                fill
                className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 animate-fadeIn"
                priority
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 52vw, 54vw"
                unoptimized={process.env.NODE_ENV === 'development'}
              />
            ) : (
              <div className="w-full h-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368] text-[18px] font-medium">
                No Preview Available
              </div>
            )}

            {/* Gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-75 group-hover:opacity-85 transition-opacity" />

            {/* Pill Play Button */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10">
              <button
                onClick={() => handlePlay(currentMovie)}
                className="inline-flex items-center gap-2 bg-white text-[#1f1f1f] hover:bg-[#f8f9fa] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-[16px] sm:text-[18px] tracking-normal shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#1f1f1f]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Play Now</span>
              </button>
            </div>
          </div>

          {/* Vertical Pill Thumbnails */}
          <div className="flex-1 flex items-stretch gap-2 sm:gap-3.5 md:gap-5 h-full min-w-0">
            {upcomingPreviews.map(({ movie: previewMovie, index }, i) => {
              const previewImageUrl = getImageUrl(previewMovie, true);

              return (
                <button
                  key={previewMovie.id || index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-1 h-full rounded-full overflow-hidden bg-[#f1f3f4] border border-[#e0e2e5] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]
                    ${i === 2 ? 'hidden sm:block' : ''}
                    ${i === 1 ? 'hidden xs:block' : ''}
                  `}
                  aria-label={`Select ${previewMovie.title || previewMovie.name}`}
                >
                  {previewImageUrl ? (
                    <Image
                      src={previewImageUrl}
                      alt={previewMovie.title || previewMovie.name || 'Upcoming movie'}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 25vw, 15vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f1f3f4]" />
                  )}
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Details & Navigation Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pt-1 sm:pt-2">

          {/* Movie Title and Description */}
          <div className="max-w-3xl space-y-2">
            <h2 className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-medium tracking-tight text-[#1f1f1f] leading-snug line-clamp-2 transition-all duration-500">
              {currentMovie.title || currentMovie.name || currentMovie.original_name}
            </h2>
            {currentMovie.overview && (
              <p className="text-[18px] text-[#5f6368] font-semibold line-clamp-2 leading-relaxed transition-all duration-500">
                {currentMovie.overview}
              </p>
            )}
          </div>

          {/* Navigation Randomizer Prev / Next Circular Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Random Movie"
              className="w-12 h-12 sm:w-13 sm:h-13 p-3.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#444746] hover:text-[#1f1f1f] active:scale-90 transition-all shadow-none border border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Random Movie"
              className="w-12 h-12 sm:w-13 sm:h-13 p-3.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#444746] hover:text-[#1f1f1f] active:scale-90 transition-all shadow-none border border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}