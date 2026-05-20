# Countries Explorer

A responsive web application that displays Asian countries fetched from the REST Countries API. Built with React, TypeScript, and custom CSS.

🔗 **Live Demo:** [https://explorer-rahult0016-5450s-projects.vercel.app/](https://explorer-rahult0016-5450s-projects.vercel.app/)

## Features

- Fetches and displays ~50 Asian countries from REST Countries API
- Real-time search filtering by country name (case-insensitive)
- Responsive design: mobile (375px), tablet (768px), desktop (1920px)
- Error handling with retry functionality
- Loading states with slow-connection detection
- Production-grade architecture with layered separation of concerns

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite** for build tooling
- **CSS Modules** for scoped styling
- **No UI libraries** — all CSS is hand-written

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+

### Installation

```bash
git clone <repository-url>
cd countries-explorer
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Deployment (Vercel)

```bash
npm i -g vercel
vercel --prod
```

## Project Structure

```
src/
├── config/          # App constants (API URLs, timeouts)
├── types/           # TypeScript interfaces
├── services/        # API service layer (HTTP concerns)
├── hooks/           # Custom React hooks (state + lifecycle)
├── utils/           # Pure utility functions (formatters)
├── components/      # UI components (co-located styles)
│   ├── CountryCard/
│   ├── CountryGrid/
│   ├── SearchBar/
│   ├── LoadingSpinner/
│   ├── ErrorMessage/
│   └── ErrorBoundary/
├── styles/          # Global CSS (reset, design tokens)
├── App.tsx          # Page orchestration
└── main.tsx         # Entry point
```

## Architecture

- **Service layer** handles HTTP — no raw `fetch()` in components
- **Custom hook** manages state, loading, errors, and AbortController cleanup
- **Pure formatters** handle data transformation (testable, zero side effects)
- **Components** are single-responsibility and presentational
- **ErrorBoundary** catches uncaught rendering errors gracefully

## API

Uses the REST Countries API with field filtering for optimised payload:

```
GET https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,languages,flags,region
```

Countries are filtered by region client-side, with Asia selected by default. No API key required. No backend needed.
