'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiArrowLeft } from 'react-icons/hi';
import { projects } from '@/lib/data/projects';
import { ProjectCategory } from '@/types';

const categoryLabels: Record<ProjectCategory, string> = {
  all: 'All Projects',
  residential: 'Residential',
  commercial: 'Commercial',
  infrastructure: 'Infrastructure',
  government: 'Government',
};

const categories: ProjectCategory[] = ['all', 'residential', 'commercial', 'infrastructure', 'government'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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

        {/* Page Hero */}
        <div className="max-w-3xl mb-12">
          <span className="text-secondary text-sm font-bold uppercase tracking-wider">Our Projects</span>
          <h1 className="font-heading text-4xl font-extrabold text-primary mt-2 mb-4 leading-tight sm:text-5xl">
            Sample work that reflects our delivery approach across project types.
          </h1>
          <p className="text-lg text-muted">
            These examples illustrate the range of consulting input we provide for residential, institutional, commercial, and infrastructure projects across Nepal.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-secondary text-white shadow-md scale-105'
                  : 'bg-white text-primary border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Projects Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover border border-gray-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-secondary/90 backdrop-blur-sm px-3.5 py-1 text-xs font-semibold text-white uppercase tracking-wider">
                    {categoryLabels[project.category as ProjectCategory]}
                  </span>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="font-heading text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm font-medium text-muted border-t border-gray-100">
                    <HiLocationMarker className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <span>{project.location}, Nepal</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
