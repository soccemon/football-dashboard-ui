import { Component, OnInit, inject, output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { League, Team, FilterState } from '../../models/models';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSelectModule, MatFormFieldModule, NgFor, NgIf],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
})
export class FilterBarComponent implements OnInit {
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);

  filterChange = output<FilterState>();

  readonly seasons = [2024, 2023, 2022];
  readonly positions = ['All', 'GK', 'DEF', 'MID', 'FWD'];

  leagues: League[] = [];
  teams: Team[] = [];
  loadingLeagues = false;
  loadingTeams = false;

  selectedSeason: number | null = null;
  selectedLeagueId: number | null = null;
  selectedTeamId: number | null = null;
  selectedPosition = 'All';

  ngOnInit(): void {
    this.loadLeagues();
  }

  onSeasonChange(season: number): void {
    this.selectedSeason = season;
    this.selectedLeagueId = null;
    this.selectedTeamId = null;
    this.teams = [];
    this.emit();
  }

  onLeagueChange(leagueId: number): void {
    this.selectedLeagueId = leagueId;
    this.selectedTeamId = null;
    this.teams = [];
    if (leagueId && this.selectedSeason) {
      this.loadTeams(leagueId, this.selectedSeason);
    }
    this.emit();
  }

  onTeamChange(teamId: number | null): void {
    this.selectedTeamId = teamId;
    this.emit();
  }

  onPositionChange(position: string): void {
    this.selectedPosition = position;
    this.emit();
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
      error: () => {
        this.leagues = [];
        this.loadingLeagues = false;
        this.cdr.markForCheck();
      },
    });
  }

  private loadTeams(leagueId: number, season: number): void {
    this.loadingTeams = true;
    this.cdr.markForCheck();
    this.api.getTeams(leagueId, season).subscribe({
      next: data => {
        this.teams = Array.isArray(data) ? data : [];
        this.loadingTeams = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.teams = [];
        this.loadingTeams = false;
        this.cdr.markForCheck();
      },
    });
  }

  private emit(): void {
    this.filterChange.emit({
      season: this.selectedSeason,
      leagueId: this.selectedLeagueId,
      teamId: this.selectedTeamId,
      position: this.selectedPosition,
    });
  }
}
