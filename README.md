# Scout — Football Dashboard

An Angular 22 single-page application for browsing player statistics across Europe's top football leagues.

**Backend API repo:** [football-dashboard-api](https://github.com/soccemon/football-dashboard-api)

## Tech stack

- **Angular 22** — standalone components, signals, `@if`/`@for` control flow
- **Angular Material 22** — Material 3 components with a custom rose/pink palette
- **FastAPI** backend (see link above) serving player and league data

## Getting started

```bash
npm install
npm start        # dev server → http://localhost:4200
npm run build    # production build → dist/
npm test         # unit tests
```

The app expects the FastAPI backend running at `http://localhost:8000`. See the backend repo for setup instructions.

## Features

- Filter players by season, league, team, and position
- Sortable player stats table with client-side pagination
- KPI cards and top-scorers panel computed from loaded data
- Light/dark mode toggle (persisted to localStorage)
- Demo mode with mock data when the API is unavailable
