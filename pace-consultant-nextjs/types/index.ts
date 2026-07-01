/** Shared TypeScript interfaces for PACE Consultant website */

export interface NavLink {
  href: string;
  label: string;
  /** Section id for scroll-spy on homepage */
  sectionId?: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  image: string;
  alt: string;
}

export type ProjectCategory =
  | 'all'
  | 'residential'
  | 'commercial'
  | 'infrastructure'
  | 'government';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: string;
  email: string;
  linkedin?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  rating: number;
  clientName: string;
  organization: string;
  project: string;
  initials: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  url: string;
  email: string;
  phone: {
    office: string;
    mobile: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  founded: number;
  social: {
    facebook: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
}
