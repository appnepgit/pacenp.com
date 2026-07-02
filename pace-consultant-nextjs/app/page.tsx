import { About } from '@/components/sections/About';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';

/**
 * Home page — composes all homepage sections.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
    </>
  );
}
