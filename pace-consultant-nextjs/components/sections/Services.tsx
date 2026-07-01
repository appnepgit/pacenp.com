'use client';

import { useState } from 'react';
import Link from 'next/link';
import { services } from '@/lib/data/services';
import { scrollToSection } from '@/lib/utils/helpers';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Service } from '@/types';

// Let's use the correct imports for React Icons
import {
  HiPencil as IconPencil,
  HiOfficeBuilding as IconOffice,
  HiCog as IconCog,
  HiClipboardList as IconClipboard,
  HiChartBar as IconChart,
  HiHome as IconHome,
  HiArrowRight,
} from 'react-icons/hi';

const iconMap = {
  drafting: IconPencil,
  building: IconOffice,
  'hard-hat': IconCog,
  tasks: IconClipboard,
  chart: IconChart,
  interior: IconHome,
} as const;

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [imgError, setImgError] = useState(false);
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? IconCog;
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
      <div className="relative h-[220px] w-full overflow-hidden bg-primary/5">
        {!imgError && service.image ? (
          <img
            src={service.image}
            alt={service.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 text-primary">
            <Icon className="h-12 w-12 opacity-80" />
          </div>
        )}
        <div className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105">
          {formattedNumber}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {service.description}
        </p>
        <Link
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact', 80);
          }}
          className="mt-5 inline-flex items-center gap-1 font-heading text-sm font-semibold text-secondary transition-colors duration-300 hover:text-secondary-dark"
        >
          Learn More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function Services() {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('contact', 80);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-gradient-to-b from-white to-gray-50 py-24 pt-32"
    >
      <div className="container-pace">
        <SectionHeader
          label="Our Expertise"
          title="Field of Services"
          titleId="services-heading"
          subtitle="We provide professional engineering, architectural, planning, valuation, environmental, and infrastructure consulting services for public and private sector development projects."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-lg bg-primary px-8 py-8 text-center text-white md:flex-row md:text-left">
          <p className="font-heading text-lg font-semibold">Need a custom solution? Let&apos;s talk.</p>
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="inline-flex shrink-0 items-center justify-center rounded bg-secondary px-6 py-3 font-heading text-sm font-semibold text-white transition hover:bg-secondary-dark"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>
  );
}
