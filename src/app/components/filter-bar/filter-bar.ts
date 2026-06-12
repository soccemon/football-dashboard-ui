import { Component, OnInit, inject, output, effect, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { League, Team, FilterState } from '../../models/models';

// OnPush + plain arrays: Angular 22 signals inside mat-select throw NG0900; plain arrays + markForCheck() is the fix
@Component({
  selector: 'app-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSelectModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
})
export class FilterBarComponent implements OnInit {
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  filterChange = output<FilterState>();
  apiError = output<string>();

  readonly seasons = [2024, 2023, 2022];
  readonly positions = ['All', 'GK', 'DEF', 'MID', 'FWD'];

  leagues: League[] = [];
  teams: Team[] = [];
  loadingLeagues = false;
  loadingTeams = false;

  selectedSeason: number | null = null;
  selectedLeagueId: number | null = null;
  selectedTeamIds: number[] = [];
  selectedPosition = 'All';

  constructor() {
    // Re-run whenever mockMode flips so switching demo on/off reloads the league list
    effect(() => {
      this.api.mockMode();
      this.clearFilters();
      this.loadLeagues();
    });
  }

  ngOnInit(): void {}

  onSeasonChange(season: number): void {
    this.selectedSeason = season;
    this.selectedLeagueId = null;
    this.selectedTeamIds = [];
    this.teams = [];
    this.emit();
  }

  onLeagueChange(leagueId: number | null): void {
    this.selectedLeagueId = leagueId;
    this.selectedTeamIds = [];
    this.teams = [];

    if (leagueId && this.selectedSeason) {
      this.loadTeams(leagueId, this.selectedSeason);
    }
    this.emit();
  }

  onTeamChange(teamIds: number[]): void {
    this.selectedTeamIds = teamIds;
    this.emit();
  }

  onPositionChange(position: string): void {
    this.selectedPosition = position;
    this.emit();
  }

  clearFilters(): void {
    this.selectedSeason = null;
    this.selectedLeagueId = null;
    this.selectedTeamIds = [];
    this.selectedPosition = 'All';
    this.teams = [];
    this.cdr.markForCheck();
    this.emit();
  }

  hasActiveFilters(): boolean {
    return this.selectedSeason !== null || this.selectedLeagueId !== null || this.selectedPosition !== 'All';
  }

  private loadLeagues(): void {
    this.loadingLeagues = true;
    this.cdr.markForCheck();
    this.api.getLeagues().subscribe({
      next: data => {
        this.leagues = Array.isArray(data) ? data : [];
        this.loadingLeagues = false;
        this.cdr.markForCheck();
      },
      error: err => {
        this.leagues = [];
        this.loadingLeagues = false;
        this.cdr.markForCheck();
        const msg = apiLimitMessage(err);
        if (msg) this.apiError.emit(msg);
      },
    });
  }

  private loadTeams(leagueId: number, season: number): void {
    this.loadingTeams = true;
    this.cdr.markForCheck();
    this.api.getTeams(leagueId, season).subscribe({
      next: teamList => {
        this.teams = teamList;
        this.loadingTeams = false;
        this.cdr.markForCheck();
        this.emit(); // updates dashboard with availableTeams so it can show "Select a team" guidance
      },
      error: err => {
        this.teams = [];
        this.loadingTeams = false;
        this.cdr.markForCheck();
        const msg = apiLimitMessage(err);
        if (msg) this.apiError.emit(msg);
      },
    });
  }

  private emit(): void {
    this.filterChange.emit({
      season: this.selectedSeason,
      leagueIds: this.selectedLeagueId ? [this.selectedLeagueId] : [],
      teamIds: this.selectedTeamIds,
      teamLeagueMap: {},
      availableTeams: [...this.teams],
      position: this.selectedPosition,
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
