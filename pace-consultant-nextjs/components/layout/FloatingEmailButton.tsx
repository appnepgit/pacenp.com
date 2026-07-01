'use client';

import { HiMail } from 'react-icons/hi';
import { siteConfig } from '@/lib/data/site';

export function FloatingEmailButton() {
  return (
    <a
      href={`mailto:${siteConfig.email}`}
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
      aria-label="Send an email to PACE Consultant"
    >
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-primary text-white text-xs font-semibold px-3 py-2 rounded-md shadow-card whitespace-nowrap font-sans">
        Email Us
      </span>

      {/* Ripple/Ping ring */}
      <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping opacity-75 group-hover:animate-none" />

      {/* Icon button */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-card transition-all duration-300 group-hover:bg-secondary-dark group-hover:scale-110 group-hover:shadow-card-hover group-active:scale-95">
        <HiMail className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
      </div>
    </a>
  );
}
