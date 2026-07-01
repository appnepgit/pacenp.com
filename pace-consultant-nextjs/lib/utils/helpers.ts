import type { ProjectCategory } from '@/types';

/** Merge Tailwind class names (simple utility — extend with clsx if needed) */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Smooth scroll to a section id with navbar offset */
export function scrollToSection(sectionId: string, offset = 80): void {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/** Validate Nepal phone numbers */
export function isValidNepalPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(\+?977)?(9[78]\d{8}|0?1\d{7,8})$/.test(cleaned);
}

/** Filter projects by category */
export function matchesProjectCategory(
  category: ProjectCategory,
  projectCategory: Exclude<ProjectCategory, 'all'>
): boolean {
  return category === 'all' || category === projectCategory;
}
