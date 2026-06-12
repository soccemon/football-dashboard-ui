# Scout — Football Dashboard UI

Angular 22 single-page application for browsing player statistics, consuming a FastAPI backend.

## Commands

```bash
npm start          # dev server → http://localhost:4200
npm run build      # production build → dist/
npm test           # unit tests (Karma)
```

## Architecture

### Stack

- **Angular 22** — standalone components, signals, `@if`/`@for` control flow
- **Angular Material 22** — Material 3 components with a custom rose/pink palette
- **SCSS** — CSS custom properties for light/dark theming
- **FastAPI backend** at `http://localhost:8000` (configure in `src/environments/`)

### File structure

```
src/
├── environments/
│   ├── environment.ts              # base config (apiUrl placeholder)
│   ├── environment.prod.ts         # production override
│   └── environment.development.ts  # development → http://localhost:8000
├── app/
│   ├── app.ts / app.html / app.scss  # root component; owns startup health check
│   ├── models/models.ts              # League, Team, Player, PlayersPage, TopScorer, FilterState
│   ├── services/
│   │   ├── api.service.ts            # all HTTP calls; mockMode signal enables demo mode
│   │   ├── mock-data.ts              # demo mode fixtures (PL, La Liga, Bundesliga, Serie A)
│   │   └── theme.service.ts          # light/dark toggle, persists to localStorage
│   ├── components/
│   │   ├── navbar/                   # brand + dark-mode toggle
│   │   ├── filter-bar/               # season / league / team / position selects + clear button
│   │   ├── kpi-row/                  # 4 stat cards computed client-side from loaded players
│   │   ├── player-table/             # sortable mat-table with client-side pagination
│   │   └── top-scorers/              # top-5 scorers derived from loaded player data
│   └── pages/dashboard/              # root page; orchestrates filters, fetching, demo mode
└── styles.scss                       # global theme (CSS vars + Material overrides)
```

## Startup health check

On bootstrap, `App.ngOnInit` fires `GET /` against the configured `apiUrl`. While waiting for a response the router outlet is suppressed and a centered loading screen is shown with a spinner and a "Waking up the server…" message.

- Any HTTP response (including 4xx/5xx, `err.status > 0`) is treated as "server up" and clears the loading screen.
- A network-level failure (`err.status === 0`) schedules a retry after 5 seconds. Retries continue indefinitely.
- The loading screen is fully themed — CSS custom properties mean it respects light/dark mode automatically.

## API endpoints

| Method | Path | Consumer |
|--------|------|----------|
| GET | `/` | `App` — startup health check |
| GET | `/leagues` | `FilterBar` on init |
| GET | `/teams?league_id={id}&season={year}` | `FilterBar` on league/season change |
| GET | `/players?league={id}&season={year}&team={id}&page={n}&per_page={n}` | `Dashboard` per selected team |

`/players` returns `{ players: Player[], total_pages: number }`. Page 1 is fetched first to obtain `total_pages`; remaining pages are fetched in parallel via `forkJoin` and merged into a single flat array. All pagination and sorting are handled client-side by `MatTableDataSource`.

All derived views — position filter, top scorers, KPI cards — operate on the fully loaded player set. No separate `/top-scorers` call is made.

## Data flow

A league **and** at least one team must be selected before players are fetched. Selecting a league only populates the team dropdown. League is single-select; team is multi-select (multiple teams fetched in parallel via `forkJoin`).

- **Position filter** (GK / DEF / MID / FWD): client-side, applied to loaded data
- **Position sort order**: GK → DEF → MID → FWD (numeric mapping)
- **Default sort**: rating descending; null ratings sort to the bottom
- **Top scorers**: computed from `allPlayers`; respects the active league/team selection

## Demo mode

Activated when the API returns an error from the filter bar (e.g. rate limit exceeded). Toggles `ApiService.mockMode` signal — when true, every service method returns mock data via `of(...)` with no HTTP calls. Mock data covers Premier League, La Liga, Bundesliga, and Serie A (Inter). Data is paginated in chunks of 7 to exercise the multi-page fetch path.

## Theming

Light/dark mode is toggled by adding/removing `.dark-theme` on `<body>`. All colours are CSS custom properties (`--scout-bg`, `--scout-surface`, `--scout-text`, etc.) defined in `src/styles.scss`. The toggle state is persisted to `localStorage` under `scout-dark-mode`.

## Known constraints

**`FilterBar` uses plain class properties, not signals, for `leagues[]` and `teams[]`.**
Angular 22's `@for` inside `mat-select` throws `NG0900` when iterating over a signal-derived value. Workaround: `ChangeDetectionStrategy.OnPush` + plain arrays + explicit `ChangeDetectorRef.markForCheck()`. All other components use signals normally.

**`FilterBar` re-emits after teams load.**
`loadTeams()` calls `emit()` on completion so the dashboard receives the updated `availableTeams` list without requiring further user interaction.

**Favicon is an inline data URI.**
The SVG favicon is embedded in `src/index.html` as a `data:image/svg+xml` URI to avoid caching and asset-serving issues with the Angular dev server. `public/favicon.svg` exists as a standalone copy but is not referenced by the HTML.
