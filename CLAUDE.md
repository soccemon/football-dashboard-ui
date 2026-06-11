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
│   ├── environment.ts              # production (apiUrl)
│   └── environment.development.ts # development (apiUrl)
├── app/
│   ├── models/models.ts            # League, Team, Player, TopScorer, FilterState
│   ├── services/
│   │   ├── api.service.ts          # all HTTP calls
│   │   └── theme.service.ts        # light/dark toggle, persists to localStorage
│   ├── components/
│   │   ├── navbar/                 # brand + dark-mode toggle
│   │   ├── filter-bar/             # season / league / team / position selects
│   │   ├── kpi-row/                # 4 computed stat cards
│   │   ├── player-table/           # sortable mat-table + paginator
│   │   └── top-scorers/            # top-5 scorers card
│   └── pages/dashboard/            # root page; orchestrates filters + API fetches
└── styles.scss                     # global theme (CSS vars + Material overrides)
```

### API endpoints consumed

| Method | Path | Used by |
|--------|------|---------|
| GET | `/leagues` | filter-bar on init |
| GET | `/teams?league_id={id}&season={year}` | filter-bar on league/season change |
| GET | `/players?league_id={id}&season={year}&team_id={id}` | dashboard on filter change |
| GET | `/top-scorers?league={id}&season={year}` | dashboard on filter change |

### Theming

Light/dark mode is toggled by adding/removing the `.dark-theme` class on `<body>`.
All colours are driven by CSS custom properties (`--scout-bg`, `--scout-surface`, `--scout-text`, etc.) defined in `src/styles.scss`. The toggle state is persisted to `localStorage` under the key `scout-dark-mode`.

## Known quirks

**FilterBar uses plain class properties, not signals, for `leagues[]` and `teams[]`.**
Angular 22's `*ngFor` inside `mat-select` throws `NG0900` when the iterable comes from a signal call. The fix is `ChangeDetectionStrategy.OnPush` + plain arrays + `ChangeDetectorRef.markForCheck()`. Other components use signals normally.
