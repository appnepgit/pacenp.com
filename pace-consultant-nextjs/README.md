# PACE Consultant — Next.js 14

Next.js 14 (App Router) migration of the PACE Consultant (P). Ltd. website.

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — scroll & entrance animations
- **React Icons**
- **next/image** & **next/font**

## Getting Started

```bash
cd pace-consultant-nextjs
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Project Structure

```
pace-consultant-nextjs/
├── app/                    # App Router pages & layout
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Page sections (Hero, About, …)
│   └── ui/                 # Reusable UI primitives
├── lib/data/               # Typed content (services, team, …)
├── types/                  # Shared TypeScript interfaces
└── public/images/          # Static assets
```

## Current Progress

- [x] `app/layout.tsx` — fonts, metadata, JSON-LD
- [x] `app/page.tsx` — home page shell
- [x] `components/layout/Navbar.tsx`
- [x] `components/sections/Hero.tsx`
- [ ] Remaining sections & sub-pages
- [ ] Footer, Contact API, full data layer

## Customization

Edit `lib/data/site.ts` for brand copy, nav links, and hero content.

Colors are defined in `tailwind.config.ts` (`primary`, `secondary`).
