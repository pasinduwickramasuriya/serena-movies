import { create } from 'zustand';
import { Movie } from '@/lib/tmdb';

interface MovieState {
  movie: Movie | null;
  isOpen: boolean;
  isPlayerMode: boolean;
  setMovie: (movie: Movie | null) => void;
  openModal: (playImmediately?: boolean) => void;
  closeModal: () => void;
  setPlayerMode: (mode: boolean) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movie: null,
  isOpen: false,
  isPlayerMode: false,
  setMovie: (movie) => set({ movie }),
  openModal: (playImmediately = false) => set({ isOpen: true, isPlayerMode: playImmediately }),
  closeModal: () => set({ isOpen: false, movie: null, isPlayerMode: false }),
  setPlayerMode: (isPlayerMode) => set({ isPlayerMode }),
}));
