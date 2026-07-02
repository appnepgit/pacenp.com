'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { Contact } from '@/components/sections/Contact';
import { Team } from '@/components/sections/Team';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'team' | 'contact'>('contact');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine active tab on mount
    const hash = window.location.hash;
    if (hash === '#team') {
      setActiveTab('team');
    } else {
      setActiveTab('contact');
    }
    setMounted(true);

    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === '#team') {
        setActiveTab('team');
      } else {
        setActiveTab('contact');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  return (
    <div id={activeTab} className="min-h-screen bg-slate-50 pt-40 md:pt-48 pb-24">
      <div className="container-pace">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200"
          >
            <HiArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>


        {/* Tab Content */}
        <div className="transition-all duration-300">
          {!mounted ? (
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-card bg-white p-12 min-h-[600px] flex flex-col gap-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border border-gray-100 p-8 flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'team' ? (
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-card bg-white">
              <Team />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-card bg-white">
              <Contact />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
