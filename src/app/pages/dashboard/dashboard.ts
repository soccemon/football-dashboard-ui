import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar';
import { KpiRowComponent } from '../../components/kpi-row/kpi-row';
import { PlayerTableComponent } from '../../components/player-table/player-table';
import { TopScorersComponent } from '../../components/top-scorers/top-scorers';
import { FilterState, Player } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FilterBarComponent,
    KpiRowComponent,
    PlayerTableComponent,
    TopScorersComponent,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private api = inject(ApiService);

  filterState = signal<FilterState>({ season: null, leagueIds: [], teamIds: [], teamLeagueMap: {}, availableTeams: [], position: 'All' });
  allPlayers = signal<Player[]>([]);
  loadingPlayers = signal(false);
  playerError = signal<string | null>(null);
  apiLimitMessage = signal<string | null>(null);

  filteredPlayers = computed(() => {
    const { position } = this.filterState();
    const players = this.allPlayers();
    return position === 'All' ? players : players.filter(p => p.position === position);
  });

  topScorers = computed(() =>
    [...this.allPlayers()]
      .filter(p => p.goals != null && p.goals > 0)
      .sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))
      .slice(0, 5)
      .map(p => ({ name: p.name, team: p.team ?? '', goals: p.goals ?? 0, photo: p.photo }))
  );

  emptyMessage = computed(() => {
    const { season, leagueIds } = this.filterState();
    if (!season) return 'Select a season to get started.';
    if (!leagueIds.length) return 'Select a league to continue.';
    return 'No players found for the selected filters.';
  });

  // Deduplicates fetches: position-only filter changes update filterState but must not re-fetch from the API
  private prevApiKey = '';

  mockMode = this.api.mockMode;

  onApiError(msg: string): void {
    this.apiLimitMessage.set(msg);
  }

  enableDemoMode(): void {
    this.api.mockMode.set(true);
    this.apiLimitMessage.set(null);
    this.prevApiKey = '';
    this.allPlayers.set([]);
  }

  onFilterChange(filter: FilterState): void {
    // No specific team selected → treat as "all teams in the league"
    const effectiveTeamIds = filter.teamIds.length > 0
      ? filter.teamIds
      : filter.availableTeams.map(t => t.id);

    const apiKey = `${filter.leagueIds.join(',')}-${filter.season}-${[...effectiveTeamIds].sort().join(',')}`;
    const changed = apiKey !== this.prevApiKey;

    this.filterState.set(filter);

    if (!filter.leagueIds.length || !filter.season) {
      this.prevApiKey = '';
      this.allPlayers.set([]);
      return;
    }

    if (changed) {
      this.prevApiKey = apiKey;

      if (effectiveTeamIds.length) {
        this.fetchPlayers(filter, effectiveTeamIds);
      } else {
        this.allPlayers.set([]);
      }
    }
  }

  private fetchPlayers(filter: FilterState, effectiveTeamIds: number[]): void {
    this.loadingPlayers.set(true);
    this.playerError.set(null);

    const teamRequests = effectiveTeamIds.map(teamId => {
      const leagueId = filter.teamLeagueMap[teamId] ?? filter.leagueIds[0];
      return this.api.getPlayers(leagueId, filter.season!, teamId, 1).pipe(
        switchMap(firstPage => {
          if (firstPage.totalPages <= 1) return of([firstPage]);
          const rest = Array.from({ length: firstPage.totalPages - 1 }, (_, i) =>
            this.api.getPlayers(leagueId, filter.season!, teamId, i + 2)
          );
          return forkJoin([of(firstPage), ...rest]);
        }),
        map(pages => pages.flatMap(p => p.items))
      );
    });

    forkJoin(teamRequests).subscribe({
      next: results => {
        this.allPlayers.set(results.flat());
        this.loadingPlayers.set(false);
      },
      error: err => {
        const limit = apiLimitMessage(err);
        if (limit) this.apiLimitMessage.set(limit);
        else this.playerError.set('Failed to load player data. Please check your connection and try again.');
        this.allPlayers.set([]);
        this.loadingPlayers.set(false);
      },
    });
  }
}

function apiLimitMessage(err: any): string | null {
  const detail: unknown = err?.error?.detail;
  if (typeof detail === 'string' && detail.toLowerCase().includes('request limit')) {
    return 'You have reached the API request limit for the day. Please try again tomorrow.';
  }
  return null;
}
