# Visit Kirehe – Tourism Website ELIAS ELAIS ELAIS ELAIS ELAIS

A modern, responsive tourism platform for **Kirehe District, Eastern Province of Rwanda**, built with **React** (frontend) and **Node.js** (backend).

## Features 

- **Homepage**: Hero, featured attractions, things to do, accommodation, cultural experiences, travel info, gallery, events, testimonials, CTA
- **Pages**: About Kirehe, Things to Do, Places to Visit, Accommodation, Events & Culture, Gallery, Travel Info, Contact, Blog, Plan Your Trip
- **Design**: Nature-inspired theme (deep green, lake blue, warm yellow), Poppins/Inter fonts, glassmorphism, smooth scroll and Framer Motion animations
- **Advanced**: Interactive Leaflet map, search for attractions and accommodation, responsive mobile menu, SEO-friendly structure

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS, Framer Motion, React Leaflet, Axios
- **Backend**: Node.js, Express, CORS
- **Data**: MySQL database (attractions, accommodations, activities, events, testimonials, blog, gallery, messages, settings, analytics)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- **MySQL** (e.g. XAMPP) – for all website and admin data

### Database setup

1. Start MySQL (e.g. start Apache + MySQL in XAMPP).
2. Create the database and tables (run once):

```bash
npm run db:init
```

This creates the `visitkirehe` database, tables, and seed data. Optional env vars: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (defaults: localhost, root, no password, visitkirehe).

### Installation

From the project root:

```bash
npm run install:all
```

Or manually:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### Development

Run both frontend and backend:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000 (Vite dev server, proxies `/api` to backend)
- **Backend**: http://localhost:5000

Or run separately:

```bash
# Terminal 1 – backend
npm run dev:server

# Terminal 2 – frontend
npm run dev:client
```

### Build & Production

```bash
npm run build
```

Then serve the built client (e.g. from `client/dist`) and run the API:

```bash
npm run start
```

Set `PORT` for the server if needed (default 5000).

## Project Structure

```
visitkireheofficial/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Layout, Map, home sections
│   │   ├── pages/         # Route pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── db/                # MySQL layer
│   │   ├── connection.js  # DB pool
│   │   ├── queries.js     # All data access
│   │   ├── schema.sql     # Tables + seed data
│   │   └── init.js        # Run once: npm run db:init
│   ├── data/              # Legacy seed (used by schema.sql)
│   └── index.js           # Express API
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attractions` | List attractions (optional `?search=`) |
| GET | `/api/attractions/:id` | Single attraction |
| GET | `/api/accommodations` | List accommodations (optional `?search=`) |
| GET | `/api/activities` | List activities |
| GET | `/api/events` | List events |
| GET | `/api/testimonials` | List testimonials |
| GET | `/api/blog` | List blog posts |
| GET | `/api/gallery` | List gallery images |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Newsletter signup |

## License

© Visit Kirehe Tourism Platform. For project use.
