# PACE Consultant (P). Ltd. — Website

Professional corporate website for **PACE Consultant (P). Ltd.**, a Kathmandu-based engineering consultancy established in 2001, specializing in architectural design and infrastructure supervision across Nepal.

## Project Description

A single-page marketing website with smooth scroll navigation, animated sections, filterable project portfolio, client testimonials carousel, contact form validation, and responsive layout optimized for desktop, tablet, and mobile browsers.

## Folder Structure

```
pace-website/
├── index.html              # Main homepage (all sections)
├── about.html              # Legacy about page
├── services.html           # Legacy services page
├── projects.html           # Legacy projects page
├── contact.html            # Legacy contact page
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles (layout, components, print)
│   ├── js/
│   │   └── main.js         # Navbar, forms, carousel, counters, polish
│   └── img/
│       ├── hero-illustration.svg
│       ├── project-1.svg
│       ├── project-2.svg
│       └── project-3.svg
└── pace-consultant-nextjs/ # Next.js 14 + TypeScript (see README inside)
```

## Two Projects in This Repo

| Folder | Type | How to run |
|--------|------|------------|
| `pace-website/` (root) | Static HTML/CSS/JS | Open `index.html` in a browser, or `npx serve .` |
| `pace-consultant-nextjs/` | Next.js 14 + TypeScript | `cd pace-consultant-nextjs` then `npm install` and `npm run dev` |

> **Note:** `npm run dev` must be run from `pace-consultant-nextjs/` — there is no `package.json` in the root folder.

### Run the Next.js app (PowerShell)

```powershell
cd "D:\One drive\OneDrive\App Dev\Web page\pacenp.com\pace-website\pace-consultant-nextjs"
npm install
npm run dev
```

Then open [http://localhost:3001](http://localhost:3001).

If `npm install` fails (e.g. OneDrive sync conflicts), close other terminals, delete the `node_modules` folder inside `pace-consultant-nextjs`, and run `npm install` again.

## Technologies Used (static site)

| Category | Tools |
|----------|--------|
| Markup | HTML5, semantic landmarks, ARIA |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Scripting | Vanilla JavaScript (ES6+) |
| Animation | [AOS](https://michalsnik.github.io/aos/) 2.3.4 |
| Icons | [Font Awesome](https://fontawesome.com/) 6.5 |
| Fonts | Google Fonts — Poppins, Inter, Manrope |
| Maps | Google Maps embed (iframe) |

## How to Run Locally

### Option 1 — Open directly
Double-click `index.html` or open it in your browser.

### Option 2 — Local server (recommended)

**Node.js (npx):**
```bash
npx serve .
```

**Python 3:**
```bash
python -m http.server 8080
```

Then visit `http://localhost:8080` (or the port shown).

> A local server avoids CORS issues with some assets and better matches production behavior.

## Customization Guide

### Brand colors
Edit CSS variables in `assets/css/styles.css`:
```css
:root {
  --primary: #1A3C5E;
  --secondary: #E8A020;
}
```

### Contact details
Update phone, email, and address in:
- `#contact` section (`index.html`)
- `.pace-footer` block (`index.html`)

### WhatsApp link
Replace the placeholder number in `index.html`:
```html
href="https://wa.me/9779800000000"
```

### Hero background
Replace `images/placeholder/hero-bg.jpg` or switch to Option B (particles) in `styles.css` under `.hero--main`.

### JSON-LD / SEO
Update structured data and meta tags in the `<head>` of `index.html`.

### EmailJS (optional)
Uncomment the EmailJS skeleton in `initEnhancedContactForm()` inside `assets/js/main.js` and add your service/template IDs.

## Features

- Sticky navbar with scroll-spy active links
- Loading screen with spinner
- AOS scroll animations
- Filterable project portfolio
- Animated statistics counter
- Testimonials carousel (auto-play, swipe, keyboard)
- Contact form with inline validation
- Newsletter signup in footer
- Cookie consent banner (localStorage)
- WhatsApp floating button
- Back-to-top button
- Print-friendly styles
- Skip-to-content link & keyboard focus styles

## Browser Support

Tested and intended for:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Apple Safari (latest)
- Microsoft Edge (latest)

Uses modern APIs: `IntersectionObserver`, `localStorage`, CSS Grid, `:focus-visible`.

## Credits

- **Client:** PACE Consultant (P). Ltd., Kathmandu, Nepal
- **Fonts:** [Google Fonts](https://fonts.google.com/)
- **Icons:** [Font Awesome](https://fontawesome.com/)
- **Animations:** [AOS](https://michalsnik.github.io/aos/)
- **Maps:** Google Maps embed

---

© PACE Consultant (P). Ltd. All rights reserved.
# pacenp.com
# pacenp.com
# pacenp.com
# pacenp.com
