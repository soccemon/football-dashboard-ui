# Scout — Football Dashboard UI

Angular 22 player stats dashboard that consumes a local FastAPI backend.

## Commands

```bash
npm start          # dev server → http://localhost:4200
npm run build      # production build → dist/
npm test           # unit tests (Karma)
```

## Architecture

### Stack
- **Angular 22** — standalone components, signals, new `@if`/`@for` control flow
- **Angular Material 22** — Material 3 components with a custom rose/pink palette
- **SCSS** — custom CSS variables for light/dark theming
- Backend: **FastAPI** at `http://localhost:8000` (configure in `src/environments/`)

### Structure

```
src/
├── environments/
│   ├── environment.ts              # production (apiUrl — placeholder until backend is deployed)
│   ├── environment.prod.ts         # production override (replace apiUrl before deploying)
│   └── environment.development.ts # development → http://localhost:8000
├── app/
│   ├── models/models.ts            # League, Team, Player, PlayersPage, TopScorer, FilterState
│   ├── services/
│   │   ├── api.service.ts          # all HTTP calls; mockMode signal enables demo mode
│   │   ├── mock-data.ts            # demo mode data (PL, La Liga, Bundesliga, Serie A)
│   │   └── theme.service.ts        # light/dark toggle, persists to localStorage
│   ├── components/
│   │   ├── navbar/                 # brand + dark-mode toggle
│   │   ├── filter-bar/             # season / league / team / position selects + clear button
│   │   ├── kpi-row/                # 4 computed stat cards (derived client-side from loaded players)
│   │   ├── player-table/           # sortable mat-table with client-side pagination; defaults to rating desc
│   │   └── top-scorers/            # top-5 scorers derived from loaded player data (respects filters)
│   └── pages/dashboard/            # root page; orchestrates filters, fetching, demo mode
└── styles.scss                     # global theme (CSS vars + Material overrides)
```

### API endpoints consumed

| Method | Path | Used by |
|--------|------|---------|
| GET | `/leagues` | filter-bar on init |
| GET | `/teams?league_id={id}&season={year}` | filter-bar on league/season change |
| GET | `/players?league={id}&season={year}&team={id}&page={n}&per_page={n}` | dashboard per team, all pages |

`/players` returns `{ players: Player[], total_pages: number }`. All pages are fetched in parallel via `forkJoin` — page 1 is fetched first to get `total_pages`, then remaining pages are fetched simultaneously and merged into one flat array. Pagination and sorting are handled client-side by `MatTableDataSource`.

All filters (league, team, position) and top scorers are derived from the fully loaded player set — no `/top-scorers` endpoint is called separately.

Selecting a league with no team chosen automatically loads players for all teams in that league. Multi-league selection is supported; the team dropdown shows teams from all selected leagues combined.

### Filtering & pagination

- **League / team**: server-side fetch per team; `forkJoin` merges all teams
- **Position** (GK / DEF / MID / FWD): client-side filter on loaded data
- **Position sort order**: GK → DEF → MID → FWD ascending (numeric mapping)
- **Default sort**: rating descending (null ratings sort to bottom)
- **Top scorers**: computed from `allPlayers` — automatically respects active league/team filters

### Demo mode

Activated via the "Try Demo Mode" button that appears when the API rate limit is hit (or on any API error from the filter bar). Uses `ApiService.mockMode` signal — when true, every service method returns mock data via `of(...)` instead of making HTTP calls. Mock data covers Premier League, La Liga, Bundesliga, and Serie A (Inter, page 1 of real API response). Mock data is paginated in chunks of 7 to exercise the multi-page fetch logic.

> **TODO**: Verify full end-to-end behaviour with a live API once the daily rate limit resets — particularly multi-page player fetching, the `team` field population, and position normalization across all API-returned position strings.

### Theming

Light/dark mode is toggled by adding/removing the `.dark-theme` class on `<body>`.
All colours are driven by CSS custom properties (`--scout-bg`, `--scout-surface`, `--scout-text`, etc.) defined in `src/styles.scss`. The toggle state is persisted to `localStorage` under the key `scout-dark-mode`.

## Known quirks

**FilterBar uses plain class properties, not signals, for `leagues[]` and `teams[]`.**
Angular 22's `*ngFor` inside `mat-select` throws `NG0900` when the iterable comes from a signal call. The fix is `ChangeDetectionStrategy.OnPush` + plain arrays + `ChangeDetectorRef.markForCheck()`. Other components use signals normally.

**FilterBar re-emits after teams load.**
`loadTeams()` calls `emit()` on completion so the dashboard receives the `availableTeams` list and can immediately fetch players without requiring the user to pick a team.
