'use client';

import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';

const googleFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

export default function Footer() {
  const footerLinks = [
    ['Audio Description', 'Investor Relations', 'Legal Notices', 'Manage Cookies'],
    ['Help Center', 'Jobs', 'Privacy Policy', 'Corporate Information'],
    ['Gift Cards', 'Terms of Service', 'Contact Us', 'Media Center'],
    ['Privacy Links', 'System Status', 'Global Terms', 'API Sandbox'],
  ];

  return (
    <footer
      className={`${googleFont.className} w-full bg-white text-[#1f1f1f] pt-12 sm:pt-16 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-[#dadce0] antialiased`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Top Segment: Social Capsule Chips + Service Code Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#e8eaed]">
          
          {/* Social Media Circular Pill Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {[
              { icon: IoLogoFacebook, label: 'Facebook' },
              { icon: IoLogoInstagram, label: 'Instagram' },
              { icon: IoLogoTwitter, label: 'Twitter' },
              { icon: IoLogoYoutube, label: 'YouTube' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-11 h-11 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#444746] hover:text-[#1f1f1f] flex items-center justify-center border border-transparent hover:border-[#dadce0] transition-all duration-200 active:scale-95"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Service Code Pill Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#1f1f1f] border border-transparent hover:border-[#dadce0] text-[14px] font-medium tracking-normal active:scale-95 transition-all duration-200"
          >
            Service Code
          </button>
        </div>

        {/* Middle Segment: Google-styled Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-6">
          {footerLinks.map((column, colIdx) => (
            <ul key={colIdx} className="flex flex-col gap-3.5">
              {column.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="inline-block text-[#5f6368] hover:text-[#1f1f1f] text-[15px] sm:text-[16px] font-normal transition-colors duration-150"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Bottom Segment: Copyright & Architect Identification */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[#e8eaed] text-[14px] text-[#5f6368]">
          
          {/* Copyright */}
          <p className="font-normal">
            © 1997-2026 Serena Movies, Inc. All Rights Reserved.
          </p>

          {/* Architect Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff] text-[13px]">
            <span className="font-medium text-[#5f6368]">Architected by</span>
            <span className="font-medium text-[#1f1f1f]">
              Pasindu Wickramasooriya
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}