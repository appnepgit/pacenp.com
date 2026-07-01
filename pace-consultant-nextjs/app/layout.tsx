import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingEmailButton } from '@/components/layout/FloatingEmailButton';
import { siteConfig } from '@/lib/data/site';
import './globals.css';

/* Google Fonts via next/font — optimized, self-hosted */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = siteConfig.url;
const siteTitle = `${siteConfig.legalName} | Architectural Design & Engineering Nepal`;
const siteDescription =
  'Leading engineering consultancy in Nepal since 2001. Expert architectural design, structural engineering, and infrastructure supervision across Kathmandu and beyond.';

/** Root metadata — SEO, Open Graph, Twitter Card */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.legalName}`,
  },
  description: siteDescription,
  keywords: [
    'engineering consultant Nepal',
    'architectural design Nepal',
    'structural engineering Kathmandu',
    'infrastructure supervision',
    'PACE Consultant',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteConfig.legalName,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/images/hero-illustration.svg', width: 1200, height: 630, alt: siteConfig.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/hero-illustration.svg'],
  },
};

/** JSON-LD structured data for ProfessionalService */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.legalName,
  foundingDate: String(siteConfig.founded),
  description: siteDescription,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  url: siteUrl,
  email: siteConfig.email,
  telephone: siteConfig.phone.office,
  areaServed: 'Nepal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white" suppressHydrationWarning>
        {/* Accessibility: skip navigation */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Navbar />

        <main id="main-content">{children}</main>

        <FloatingEmailButton />
      </body>
    </html>
  );
}
