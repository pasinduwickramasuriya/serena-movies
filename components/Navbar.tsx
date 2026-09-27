// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Roboto } from 'next/font/google';
// import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

// const googleFont = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
//   fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
// });

// interface NavbarProps {
//   onSearch?: (query: string) => void;
// }

// export default function Navbar({ onSearch }: NavbarProps) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (onSearch) onSearch(query);
//   };

//   const navItems = [
//     { title: 'Home Dashboard', desc: 'Back to main stream overview', href: '/' },
//     { title: 'TV Series Collection', desc: 'Explore original episodic shows', href: '/series' },
//     { title: 'Full Length Movies', desc: 'Cinema productions and hit blockbusters', href: '/movies' },
//     { title: 'New & Trending', desc: 'Fresh additions and top stream metrics', href: '/new' },
//     { title: 'My Saved Watchlist', desc: 'Your personalized custom bookmarks', href: '/my-list' },
//   ];

//   return (
//     <>
//       {/* Top Floating Google-Style Navbar */}
//       <nav
//         className={`${googleFont.className} fixed top-4 sm:top-6 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 pointer-events-none antialiased`}
//       >
//         {/* Left Sector: Google Pill Capsule Logo */}
//         <Link href="/" className="pointer-events-auto">
//           <div
//             className={`inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
//               isScrolled
//                 ? 'bg-white text-[#1f1f1f] border-[#dadce0] shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_rgba(60,64,67,0.15)]'
//                 : 'bg-[#f1f3f4] text-[#1f1f1f] border-transparent hover:bg-[#e8eaed]'
//             }`}
//           >
//             <span className="text-[18px] font-medium tracking-normal leading-none select-none">
//               Serena
//             </span>
//           </div>
//         </Link>

//         {/* Right Sector: Search Bar + Menu Toggle Button */}
//         <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
//           {/* Search Box: Google Omnibox Pill Style */}
//           <div
//             className={`flex items-center rounded-full px-4 sm:px-5 py-2 sm:py-2.5 border transition-all duration-200 focus-within:ring-2 focus-within:ring-[#1a73e8] focus-within:bg-white focus-within:border-transparent ${
//               isScrolled
//                 ? 'bg-white border-[#dadce0] shadow-[0_1px_2px_rgba(60,64,67,0.3)]'
//                 : 'bg-[#f1f3f4] border-transparent hover:bg-[#e8eaed]'
//             }`}
//           >
//             <IoSearchOutline className="w-5 h-5 text-[#5f6368] shrink-0" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="bg-transparent border-none outline-none text-[18px] ml-2.5 w-24 sm:w-44 md:w-56 placeholder:text-[#5f6368] text-[#1f1f1f] font-normal leading-normal"
//             />
//           </div>

//           {/* Action Menu Pill Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none ${
//               isMenuOpen
//                 ? 'bg-[#1f1f1f] text-white border-[#1f1f1f] shadow-md'
//                 : isScrolled
//                 ? 'bg-white text-[#444746] border-[#dadce0] hover:bg-[#f8f9fa] shadow-sm'
//                 : 'bg-[#f1f3f4] text-[#444746] border-transparent hover:bg-[#e8eaed]'
//             }`}
//             aria-label="Toggle Navigation Menu"
//           >
//             {isMenuOpen ? <IoCloseOutline className="w-6 h-6" /> : <IoMenuOutline className="w-6 h-6" />}
//           </button>
//         </div>
//       </nav>

//       {/* Floating Dropdown Menu: Clean Google Material Card Design */}
//       <div
//         className={`${googleFont.className} fixed top-20 sm:top-24 right-4 sm:right-8 md:right-12 lg:right-16 z-40 flex flex-col gap-2 w-80 sm:w-96 transition-all duration-300 ${
//           isMenuOpen
//             ? 'pointer-events-auto opacity-100 translate-y-0'
//             : 'pointer-events-none opacity-0 -translate-y-3'
//         }`}
//       >
//         <div className="bg-white border border-[#dadce0] rounded-[28px] p-3 shadow-[0_4px_16px_rgba(60,64,67,0.15)] flex flex-col gap-1">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={() => setIsMenuOpen(false)}
//               className="flex flex-col px-5 py-3.5 rounded-[20px] bg-[#f8f9fa] hover:bg-[#e8eaed] active:bg-[#dadce0] text-[#1f1f1f] transition-all duration-150 border border-transparent hover:border-[#dadce0]"
//             >
//               <span className="text-[18px] font-medium text-[#1f1f1f] leading-snug">
//                 {item.title}
//               </span>
//               <span className="text-[14px] text-[#5f6368] font-normal mt-0.5">
//                 {item.desc}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const googleFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

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

  const navItems = [
    { title: 'Home Dashboard', desc: 'Back to main stream overview', href: '/' },
    { title: 'TV Series Collection', desc: 'Explore original episodic shows', href: '/series' },
    { title: 'Full Length Movies', desc: 'Cinema productions and hit blockbusters', href: '/movies' },
    { title: 'New & Trending', desc: 'Fresh additions and top stream metrics', href: '/new' },
    { title: 'My Saved Watchlist', desc: 'Your personalized custom bookmarks', href: '/my-list' },
  ];

  return (
    <>
      {/* Top Floating Google-Style Navbar */}
      <nav
        className={`${googleFont.className} fixed top-4 sm:top-6 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 pointer-events-none antialiased`}
      >
        {/* Left Sector: Logo Pill */}
        <Link href="/" className="pointer-events-auto">
          <div
            className={`inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
              isScrolled
                ? 'bg-white text-[#1f1f1f] border-[#dadce0] shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_rgba(60,64,67,0.15)]'
                : 'bg-[#f1f3f4] text-[#1f1f1f] border-transparent hover:bg-[#e8eaed]'
            }`}
          >
            <span className="text-[18px] font-medium tracking-normal leading-none select-none">
              Serena
            </span>
          </div>
        </Link>

        {/* Right Sector: Search Bar + Menu Toggle Button */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Search Box */}
          <div
            className={`flex items-center rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 border transition-all duration-200 focus-within:ring-2 focus-within:ring-[#1a73e8] focus-within:bg-white focus-within:border-transparent ${
              isScrolled
                ? 'bg-white border-[#dadce0] shadow-[0_1px_2px_rgba(60,64,67,0.3)]'
                : 'bg-[#f1f3f4] border-transparent hover:bg-[#e8eaed]'
            }`}
          >
            <IoSearchOutline className="w-5 h-5 text-[#5f6368] shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent border-none outline-none text-[16px] sm:text-[18px] ml-2 sm:ml-2.5 w-20 sm:w-44 md:w-56 placeholder:text-[#5f6368] text-[#1f1f1f] font-normal leading-normal"
            />
          </div>

          {/* Action Menu Pill Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none ${
              isMenuOpen
                ? 'bg-[#1f1f1f] text-white border-[#1f1f1f] shadow-md'
                : isScrolled
                ? 'bg-white text-[#444746] border-[#dadce0] hover:bg-[#f8f9fa] shadow-sm'
                : 'bg-[#f1f3f4] text-[#444746] border-transparent hover:bg-[#e8eaed]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <IoCloseOutline className="w-6 h-6" /> : <IoMenuOutline className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Floating Dropdown Menu */}
      <div
        className={`${googleFont.className} fixed top-20 sm:top-24 right-4 sm:right-8 md:right-12 lg:right-16 z-40 flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 transition-all duration-300 ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-3'
        }`}
      >
        <div className="bg-white border border-[#dadce0] rounded-[28px] p-3 shadow-[0_4px_16px_rgba(60,64,67,0.15)] flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col px-5 py-3.5 rounded-[20px] bg-[#f8f9fa] hover:bg-[#e8eaed] active:bg-[#dadce0] text-[#1f1f1f] transition-all duration-150 border border-transparent hover:border-[#dadce0]"
            >
              <span className="text-[18px] font-medium text-[#1f1f1f] leading-snug">
                {item.title}
              </span>
              <span className="text-[14px] text-[#5f6368] font-normal mt-0.5">
                {item.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}