import { Component, OnInit, inject, output, effect, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { League, Team, FilterState } from '../../models/models';
import { forkJoin, of } from 'rxjs';

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
  selectedLeagueIds: number[] = [];
  selectedTeamIds: number[] = [];
  selectedPosition = 'All';

  private teamLeagueMap: Record<number, number> = {};

  constructor() {
    effect(() => {
      this.api.mockMode();
      this.clearFilters();
      this.loadLeagues();
    });
  }

  ngOnInit(): void {}

  onSeasonChange(season: number): void {
    this.selectedSeason = season;
    this.selectedLeagueIds = [];
    this.selectedTeamIds = [];
    this.teams = [];
    this.teamLeagueMap = {};
    this.emit();
  }

  onLeagueChange(leagueIds: number[]): void {
    this.selectedLeagueIds = leagueIds;
    this.selectedTeamIds = [];
    this.teams = [];
    this.teamLeagueMap = {};

    if (leagueIds.length && this.selectedSeason) {
      this.loadTeams(leagueIds, this.selectedSeason);
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
    this.selectedLeagueIds = [];
    this.selectedTeamIds = [];
    this.selectedPosition = 'All';
    this.teams = [];
    this.teamLeagueMap = {};
    this.cdr.markForCheck();
    this.emit();
  }

  hasActiveFilters(): boolean {
    return this.selectedSeason !== null || this.selectedLeagueIds.length > 0 || this.selectedPosition !== 'All';
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

  private loadTeams(leagueIds: number[], season: number): void {
    this.loadingTeams = true;
    this.cdr.markForCheck();
    const requests = leagueIds.map(id => this.api.getTeams(id, season));
    forkJoin(requests.length ? requests : [of([])]).subscribe({
      next: results => {
        const map: Record<number, number> = {};
        const merged: Team[] = [];
        results.forEach((teamList, idx) => {
          teamList.forEach(team => {
            map[team.id] = leagueIds[idx];
            merged.push(team);
          });
        });
        this.teamLeagueMap = map;
        this.teams = merged;
        this.loadingTeams = false;
        this.cdr.markForCheck();
        this.emit();
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
      leagueIds: this.selectedLeagueIds,
      teamIds: this.selectedTeamIds,
      teamLeagueMap: { ...this.teamLeagueMap },
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
