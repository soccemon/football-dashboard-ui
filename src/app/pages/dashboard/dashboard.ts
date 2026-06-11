import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar';
import { KpiRowComponent } from '../../components/kpi-row/kpi-row';
import { PlayerTableComponent } from '../../components/player-table/player-table';
import { TopScorersComponent } from '../../components/top-scorers/top-scorers';
import { FilterState, Player, TopScorer } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FilterBarComponent,
    KpiRowComponent,
    PlayerTableComponent,
    TopScorersComponent,
    MatIconModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private api = inject(ApiService);

  filterState = signal<FilterState>({ season: null, leagueId: null, teamId: null, position: 'All' });
  allPlayers = signal<Player[]>([]);
  topScorers = signal<TopScorer[]>([]);
  loadingPlayers = signal(false);
  loadingTopScorers = signal(false);
  playerError = signal<string | null>(null);

  filteredPlayers = computed(() => {
    const { position } = this.filterState();
    const players = this.allPlayers();
    return position === 'All' ? players : players.filter(p => p.position === position);
  });

  hasLeagueAndSeason = computed(() => {
    const { leagueId, season } = this.filterState();
    return !!(leagueId && season);
  });

  emptyMessage = computed(() =>
    this.hasLeagueAndSeason() ? 'No players found for the selected filters.' : 'Select a season and league to get started.',
  );

  private prevApiKey = '';

  onFilterChange(filter: FilterState): void {
    const apiKey = `${filter.leagueId}-${filter.season}-${filter.teamId}`;
    const changed = apiKey !== this.prevApiKey;

    this.filterState.set(filter);

    if (!filter.leagueId || !filter.season) {
      this.prevApiKey = '';
      this.allPlayers.set([]);
      this.topScorers.set([]);
      return;
    }

    if (changed) {
      this.prevApiKey = apiKey;
      this.fetchPlayers(filter);
      this.fetchTopScorers(filter);
    }
  }

  private fetchPlayers(filter: FilterState): void {
    this.loadingPlayers.set(true);
    this.playerError.set(null);
    this.api.getPlayers(filter.leagueId!, filter.season!, filter.teamId ?? undefined).subscribe({
      next: players => { this.allPlayers.set(players); this.loadingPlayers.set(false); },
      error: () => {
        this.playerError.set('Failed to load player data. Please check your connection and try again.');
        this.allPlayers.set([]);
        this.loadingPlayers.set(false);
      },
    });
  }

  private fetchTopScorers(filter: FilterState): void {
    this.loadingTopScorers.set(true);
    this.api.getTopScorers(filter.leagueId!, filter.season!).subscribe({
      next: scorers => { this.topScorers.set(scorers.slice(0, 5)); this.loadingTopScorers.set(false); },
      error: () => { this.topScorers.set([]); this.loadingTopScorers.set(false); },
    });
  }
}
