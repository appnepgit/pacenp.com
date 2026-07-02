'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { Contact } from '@/components/sections/Contact';
import { Team } from '@/components/sections/Team';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'team' | 'contact'>('contact');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#team') {
        setActiveTab('team');
      } else {
        setActiveTab('contact');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
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

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-primary/5 rounded-xl border border-primary/10">
            <button
              onClick={() => {
                setActiveTab('team');
                window.location.hash = 'team';
              }}
              className={`rounded-lg px-8 py-3 text-base font-bold transition-all duration-300 ${
                activeTab === 'team'
                  ? 'bg-secondary text-white shadow-md scale-105'
                  : 'text-primary hover:text-secondary'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                window.location.hash = 'contact';
              }}
              className={`rounded-lg px-8 py-3 text-base font-bold transition-all duration-300 ${
                activeTab === 'contact'
                  ? 'bg-secondary text-white shadow-md scale-105'
                  : 'text-primary hover:text-secondary'
              }`}
            >
              Contact Form
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'team' ? (
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
