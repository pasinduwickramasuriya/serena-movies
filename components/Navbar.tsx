'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoSearchOutline, IoNotificationsOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  return (
    <>
      {/* Top Floating Core Navigation Wrapper (Completely transparent window backdrop) */}
      <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-10 pointer-events-none">


        {/* Left Sector: Completely Separate Inline Logo Capsule */}
        <Link href="/" className="pointer-events-auto">
          <div className={`logoBlock transition-all duration-300 ${isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md border-neutral-200/60'
            : 'bg-white/60 backdrop-blur-xs border-transparent'
            }`}>
            {/* Slightly downsized font text to text-lg to match the tighter micro-capsule size */}
            <span className="text-lg font-bold text-black tracking-tight italic leading-none block">
              Serena
            </span>
          </div>
        </Link>

        {/* Right Sector: Row of Independent Floating Blocks */}
        <div className="flex items-center space-x-3 pointer-events-auto">

          {/* SEARCH SECTOR: Separate Inline Floating Block */}
          <div className={`searchBlock transition-all duration-300 flex items-center rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-black/5 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md border-neutral-200/60' : 'bg-white/60 backdrop-blur-xs border-neutral-200/30'
            }`}>
            <IoSearchOutline className="h-3.5 w-3.5 text-black" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent border-none outline-none text-base md:text-sm ml-2 w-20 sm:w-36 md:w-48 placeholder:text-black text-black font-medium"
            />
          </div>

          {/* HAMBURGER SECTOR: Completely Independent Pill Button Block */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm active:scale-95 transition-all duration-300 focus:outline-none z-[60] relative hamburgerBlock ${isMenuOpen
              ? 'bg-neutral-900 text-white ring-4 ring-neutral-900/10 border-neutral-900'
              : isScrolled
                ? 'bg-white/90 backdrop-blur-md text-neutral-800 border-neutral-200/60 shadow-md'
                : 'bg-white/60 backdrop-blur-xs text-neutral-800 border-neutral-200/30'
              }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <IoCloseOutline className="h-4 w-4" /> : <IoMenuOutline className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Staggered Dropdown Menu Items (Fully separate blocks with matching rounded pill curves) */}
      <div
        className={`fixed top-20 right-4 lg:right-10 z-40 flex flex-col space-y-2.5 w-76 sm:w-84 transition-all duration-300 ${isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
      >

        {/* Sector 1: Home Dashboard */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className={`blogLink rounded-full bg-slate-50 border-slate-200/80 hover:border-slate-400/60 ${isMenuOpen ? 'showLink delay-1' : 'hideLink'}`}
        >
          <span className="text-slate-900 font-bold text-xs sm:text-sm">Home Dashboard</span>
          <span className="text-[10px] text-slate-500 font-normal mt-0.5 opacity-90">Back to main stream overview</span>
        </Link>

        {/* Sector 2: TV Series */}
        <Link
          href="/series"
          onClick={() => setIsMenuOpen(false)}
          className={`blogLink rounded-full bg-indigo-50/90 border-indigo-200/80 hover:border-indigo-400/60 ${isMenuOpen ? 'showLink delay-2' : 'hideLink'}`}
        >
          <span className="text-indigo-900 font-bold text-xs sm:text-sm">TV Series Collection</span>
          <span className="text-[10px] text-indigo-500 font-normal mt-0.5 opacity-90">Explore original episodic shows</span>
        </Link>

        {/* Sector 3: Movies */}
        <Link
          href="/movies"
          onClick={() => setIsMenuOpen(false)}
          className={`blogLink rounded-full bg-violet-50/90 border-violet-200/80 hover:border-violet-400/60 ${isMenuOpen ? 'showLink delay-3' : 'hideLink'}`}
        >
          <span className="text-violet-900 font-bold text-xs sm:text-sm">Full Length Movies</span>
          <span className="text-[10px] text-violet-500 font-normal mt-0.5 opacity-90">Cinema productions and hit blockbusters</span>
        </Link>

        {/* Sector 4: New Releases */}
        <Link
          href="/new"
          onClick={() => setIsMenuOpen(false)}
          className={`blogLink rounded-full bg-amber-50/90 border-amber-200/80 hover:border-amber-400/60 ${isMenuOpen ? 'showLink delay-4' : 'hideLink'}`}
        >
          <span className="text-amber-900 font-bold text-xs sm:text-sm">New & Trending Releases</span>
          <span className="text-[10px] text-amber-500 font-normal mt-0.5 opacity-90">Fresh additions and top stream metrics</span>
        </Link>

        {/* Sector 5: Watchlist */}
        <Link
          href="/my-list"
          onClick={() => setIsMenuOpen(false)}
          className={`blogLink rounded-full bg-rose-50/90 border-rose-200/80 hover:border-rose-400/60 ${isMenuOpen ? 'showLink delay-5' : 'hideLink'}`}
        >
          <span className="text-rose-900 font-bold text-xs sm:text-sm">My Saved Bookmarks</span>
          <span className="text-[10px] text-rose-500 font-normal mt-0.5 opacity-90">Your personalized custom watchlist</span>
        </Link>

      </div>

      {/* Styled JSX Styles for the Separate Custom Sectors */}
      <style jsx>{`
        /* Isolated Logo Block Capsule Style */
        .logoBlock {
          display: inline-flex;
          padding: 0.6rem 1.4rem;
          border-radius: 9999px;
          border-width: 1px;
          border-style: solid;
        }

        /* Isolated Separate Search Block Capsule Style */
        .searchBlock {
          border-width: 1px;
          border-style: solid;
        }

        /* Isolated Separate Hamburger Block Capsule Style */
        .hamburgerBlock {
          border-width: 1px;
          border-style: solid;
        }

        /* Reusable Isolated Pill-Shaped Navigation Block Sector Style */
        .blogLink {
          display: flex;
          flex-direction: column;
          padding: 0.85rem 2rem;
          border-width: 1px;
          border-style: solid;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, background-color 0.2s ease, border-color 0.2s ease;
        }
        
        .blogLink:hover {
          background-color: #ffffff !important;
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: scale(1.02) translateY(-3px) !important;
        }

        /* Staggered entry transitions */
        .showLink {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        .hideLink {
          opacity: 0;
          transform: translateY(-16px) scale(0.92);
        }

        .delay-1 { transition-delay: 0.02s; }
        .delay-2 { transition-delay: 0.05s; }
        .delay-3 { transition-delay: 0.08s; }
        .delay-4 { transition-delay: 0.11s; }
        .delay-5 { transition-delay: 0.14s; }
      `}</style>
    </>
  );
}