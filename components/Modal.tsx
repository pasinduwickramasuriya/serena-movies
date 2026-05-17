'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;
import { useMovieStore } from '@/store/movieStore';
import { getMovieDetails, imageBaseUrl } from '@/lib/tmdb';
import { IoClose, IoPlay, IoAdd, IoThumbsUpSharp, IoVolumeMediumOutline, IoVolumeMuteOutline } from 'react-icons/io5';

export default function Modal() {
  const { movie, isOpen, closeModal, isPlayerMode, setPlayerMode } = useMovieStore();
  const [trailer, setTrailer] = useState('');
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await getMovieDetails(movie!.id, movie!.first_air_date ? 'tv' : 'movie');
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: any) => element.type === 'Trailer'
        );
        setTrailer(data.videos.results[index]?.key);
      }
    }

    fetchMovie();
    setIsPlaying(true);
  }, [movie]);

  if (!isOpen || !movie) return null;

  const handleClose = () => {
    setIsPlaying(false);
    closeModal();
    setTrailer('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8 overflow-y-auto scrollbar-hide">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-[70] h-8 w-8 border-none bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full transition-colors"
        >
          <IoClose className="h-5 w-5 text-gray-600" />
        </button>

        {isPlayerMode ? (
          <div className="relative pt-[56.25%] bg-black">
            <iframe
              src={`https://vidsrc.me/embed/${movie.first_air_date ? 'tv' : 'movie'}?tmdb=${movie.id}`}
              className="absolute inset-0 h-full w-full border-none"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="origin"
            />
          </div>
        ) : (
          <>
            <div className="relative pt-[56.25%]">
              {trailer ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: '0', left: '0' }}
                  playing={isPlaying}
                  muted={muted}
                  onEnded={() => setIsPlaying(false)}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                  <img
                    src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="h-full w-full object-cover opacity-60"
                  />
                  <p className="absolute text-foreground font-semibold text-lg italic text-black">Trailer previewing soon...</p>
                </div>
              )}

              <div className="absolute bottom-6 left-6 flex w-full items-center justify-between px-6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPlayerMode(true)}
                    className="flex items-center gap-x-2 rounded-full bg-netflix-red px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-600 shadow-lg"
                  >
                    <IoPlay className="h-5 w-5 text-white" />
                    Play Now
                  </button>
                  <button className="modalButton">
                    <IoAdd className="h-5 w-5" />
                  </button>
                  <button className="modalButton">
                    <IoThumbsUpSharp className="h-4 w-4" />
                  </button>
                </div>
                <button className="modalButton mr-12" onClick={() => setMuted(!muted)}>
                  {muted ? (
                    <IoVolumeMuteOutline className="h-5 w-5" />
                  ) : (
                    <IoVolumeMediumOutline className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col rounded-b-md bg-white px-8 py-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs">
                  <p className="font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                    {Math.round(movie!.vote_average * 10)}% Match
                  </p>
                  <p className="text-gray-500 font-medium italic">
                    {movie?.release_date || movie?.first_air_date}
                  </p>
                  <div className="flex h-4 items-center justify-center rounded border border-gray-200 px-1.5 text-[9px] font-bold text-gray-400">
                    4K Ultra HD
                  </div>
                </div>

                <div className="flex flex-col gap-x-12 gap-y-6 md:flex-row">
                  <p className="w-full md:w-2/3 text-sm text-gray-600 leading-relaxed font-light text-black">
                    {movie?.overview}
                  </p>
                  <div className="flex flex-col space-y-3 text-[11px] text-gray-400 w-full md:w-1/3 border-l border-gray-50 pl-6">
                    <div>
                      <span className="font-semibold text-gray-300">Genres: </span>
                      <span className="text-gray-500 italic">Action, Adventure, Fantasy</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-300">Available in: </span>
                      <span className="text-gray-500">English, Spanish, French</span>
                    </div>
                    <div className="pt-2">
                      <span className="font-semibold text-gray-300 italic">Serena Ratings: </span>
                      <span className="text-netflix-red font-bold">{movie?.vote_average}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .modalButton {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.25rem;
          width: 2.25rem;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: white;
          color: #4b5563;
          transition: all 0.2s;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .modalButton:hover {
          border-color: var(--netflix-red);
          color: var(--netflix-red);
          transform: scale(1.1);
        }
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
