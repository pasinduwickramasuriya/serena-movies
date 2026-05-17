// 'use client';

// import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';

// export default function Footer() {
//   return (
//     <footer className="bg-white py-12 px-4 md:px-10 border-t border-neutral-200 text-neutral-600">
//       <div className="max-w-5xl mx-auto">

//         {/* Social Media Icons */}
//         <div className="flex space-x-6 mb-8 text-neutral-500">
//           <a href="#" className="hover:text-black transition duration-200">
//             <IoLogoFacebook className="h-6 w-6" />
//           </a>
//           <a href="#" className="hover:text-black transition duration-200">
//             <IoLogoInstagram className="h-6 w-6" />
//           </a>
//           <a href="#" className="hover:text-black transition duration-200">
//             <IoLogoTwitter className="h-6 w-6" />
//           </a>
//           <a href="#" className="hover:text-black transition duration-200">
//             <IoLogoYoutube className="h-6 w-6" />
//           </a>
//         </div>

//         {/* Footer Links Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-normal tracking-wide">
//           <ul className="space-y-3">
//             <li className="footerLink">Audio Description</li>
//             <li className="footerLink">Investor Relations</li>
//             <li className="footerLink">Legal Notices</li>
//             <li className="footerLink">Manage Cookies</li>
//           </ul>
//           <ul className="space-y-3">
//             <li className="footerLink">Help Center</li>
//             <li className="footerLink">Jobs</li>
//             <li className="footerLink">Privacy</li>
//             <li className="footerLink">Corporate Information</li>
//           </ul>
//           <ul className="space-y-3">
//             <li className="footerLink">Gift Cards</li>
//             <li className="footerLink">Terms of Use</li>
//             <li className="footerLink">Contact Us</li>
//           </ul>
//           <ul className="space-y-3">
//             <li className="footerLink">Media Center</li>
//             <li className="footerLink">Privacy Links</li>
//             <li className="footerLink">Service Code</li>
//           </ul>
//         </div>

//         {/* Service Code Button */}
//         <button className="mt-8 border border-neutral-400 px-2 py-1 text-xs font-normal text-neutral-600 hover:text-black hover:border-black transition duration-200">
//           Service Code
//         </button>

//         {/* Copyright Notice */}
//         <p className="mt-6 text-xs text-neutral-400">© 1997-2026 Serena Movies, Inc.</p>
//       </div>

//       <style jsx>{`
//         .footerLink {
//           cursor: pointer;
//           transition: all 0.2s;
//           color: #525252; /* Neutral dark gray for clean light mode reading */
//         }
//         .footerLink:hover {
//           color: #000000; /* Crisp black on focus */
//           text-decoration: underline;
//         }
//       `}</style>
//     </footer>
//   );
// }





'use client';

import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';

export default function Footer() {
  return (
    <footer className="bg-white py-16 px-6 md:px-12 border-t border-neutral-100/80 text-neutral-500 select-none">
      <div className="max-w-6xl mx-auto flex flex-col space-y-12">

        {/* Top Segment: Row holding separated floating socials and service capsule */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-neutral-100/60">

          {/* Social Media Icons (Isolated, standalone floating interactive capsule blocks) */}
          <div className="flex items-center space-x-2.5">
            <a href="#" className="socialBlock" aria-label="Facebook Link">
              <IoLogoFacebook className="h-4 w-4" />
            </a>
            <a href="#" className="socialBlock" aria-label="Instagram Link">
              <IoLogoInstagram className="h-4 w-4" />
            </a>
            <a href="#" className="socialBlock" aria-label="Twitter Link">
              <IoLogoTwitter className="h-4 w-4" />
            </a>
            <a href="#" className="socialBlock" aria-label="YouTube Link">
              <IoLogoYoutube className="h-4 w-4" />
            </a>
          </div>

          {/* Service Code Interactive Pill Button */}
          <button className="serviceCapsuleBtn bg-neutral-50 text-neutral-600 border border-neutral-200/50 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 active:scale-95 transition-all duration-300 focus:outline-none">
            <span>Service Code</span>
          </button>
        </div>

        {/* Middle Segment: Refined Clean Casing & High-Contrast Typography Link Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-8 text-xs font-normal text-neutral-800">
          <ul className="flex flex-col space-y-2.5">
            <li className="footerLink">Audio Description</li>
            <li className="footerLink">Investor Relations</li>
            <li className="footerLink">Legal Notices</li>
            <li className="footerLink">Manage Cookies</li>
          </ul>
          <ul className="flex flex-col space-y-2.5">
            <li className="footerLink">Help Center</li>
            <li className="footerLink">Jobs</li>
            <li className="footerLink">Privacy</li>
            <li className="footerLink">Corporate Information</li>
          </ul>
          <ul className="flex flex-col space-y-2.5">
            <li className="footerLink">Gift Cards</li>
            <li className="footerLink">Terms of Use</li>
            <li className="footerLink">Contact Us</li>
            <li className="footerLink">Media Center</li>
          </ul>
          <ul className="flex flex-col space-y-2.5">
            <li className="footerLink">Privacy Links</li>
            <li className="footerLink">System Status</li>
            <li className="footerLink">Global Terms</li>
            <li className="footerLink">API Sandbox</li>
          </ul>
        </div>

        {/* Bottom Segment: Metadata Legal Info & Architect Identification Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-100/60 text-[11px] font-normal text-neutral-400">

          {/* Copyright Metadata */}
          <p>© 1997-2026 Serena Movies, Inc. All Rights Reserved.</p>

          {/* Architect Credit Tag (Clean, premium micro-layout badge profile alignment) */}
          <div className="flex items-center space-x-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-normal text-neutral-400">Architected by</span>
            <span className="font-medium text-neutral-700 hover:text-black cursor-default transition-colors">
              Pasindu Wickramasooriya
            </span>
          </div>

        </div>
      </div>

      {/* Styled JSX Parameters for Modular Capsule Block Scoping */}
      <style jsx>{`
        /* Standalone Social Capsule Blocks Formatting */
        .socialBlock {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background-color: #f5f5f5;
          border: 1px solid rgba(0, 0, 0, 0.03);
          color: #525252;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .socialBlock:hover {
          background-color: #ffffff;
          color: #000000;
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        /* Service Code Capsule Formatting Adjustment */
        .serviceCapsuleBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.45rem 1.2rem;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 500;
        }

        /* Modern, High-Contrast Typography Micro Grid Links Formatting */
        .footerLink {
          width: max-content;
          cursor: pointer;
          color: #404040; /* Crisp dark gray for superior modern light-mode visibility */
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .footerLink:hover {
          color: #000000; /* Snaps to true rich black on hover states */
          transform: translateX(3px);
        }
      `}</style>
    </footer>
  );
}




