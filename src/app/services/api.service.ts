import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { League, Team, Player, PlayersPage, TopScorer } from '../models/models';
import { MOCK_LEAGUES, MOCK_TEAMS, getMockPlayersPage, getMockTopScorers } from './mock-data';

const POSITION_MAP: Record<string, string> = {
  Goalkeeper: 'GK',
  Defender: 'DEF',
  Midfielder: 'MID',
  Attacker: 'FWD',
  Forward: 'FWD',
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  readonly mockMode = signal(false);

  getLeagues(): Observable<League[]> {
    if (this.mockMode()) return of(MOCK_LEAGUES);
    return this.http.get<{ leagues: League[] }>(`${this.base}/leagues`).pipe(
      map(r => r.leagues ?? [])
    );
  }

  getTeams(leagueId: number, season: number): Observable<Team[]> {
    if (this.mockMode()) return of(MOCK_TEAMS[leagueId] ?? []);
    const params = new HttpParams()
      .set('league_id', leagueId)
      .set('season', season);
    return this.http.get<{ teams: Team[] }>(`${this.base}/teams`, { params }).pipe(
      map(r => r.teams ?? [])
    );
  }

  getPlayers(leagueId: number, season: number, teamId?: number, page = 1, pageSize = 25): Observable<PlayersPage> {
    if (this.mockMode()) return of(getMockPlayersPage(teamId ?? 0, page));
    let params = new HttpParams()
      .set('league', leagueId)
      .set('season', season)
      .set('page', page)
      .set('per_page', pageSize);
    if (teamId != null) params = params.set('team', teamId);

    return this.http
      .get<{ players: RawPlayer[]; total_pages: number }>(`${this.base}/players`, { params })
      .pipe(
        map(r => ({
          items: (r.players ?? []).map(p => normalizePlayer(p)),
          totalPages: r.total_pages ?? 1,
        }))
      );
  }

  getTopScorers(leagueId: number, season: number): Observable<TopScorer[]> {
    if (this.mockMode()) return of(getMockTopScorers(leagueId));
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get<{ top_scorers: TopScorer[] }>(`${this.base}/top-scorers`, { params }).pipe(
      map(r => r.top_scorers ?? [])
    );
  }
}

interface RawPlayer {
  id: number;
  name: string;
  photo?: string;
  nationality?: string;
  position: string;
  age: number;
  appearances: number | null;
  goals: number | null;
  assists: number | null;
  rating: string | number | null;
  passes_accuracy: number | null;
  yellow_cards: number | null;
  red_cards: number | null;
  team?: string;
}

function normalizePlayer(p: RawPlayer): Player {
  return {
    id: p.id,
    name: p.name,
    photo: p.photo,
    nationality: p.nationality,
    position: POSITION_MAP[p.position] ?? p.position,
    age: p.age,
    appearances: p.appearances,
    goals: p.goals,
    assists: p.assists,
    rating: p.rating != null ? parseFloat(String(p.rating)) : null,
    pass_accuracy: p.passes_accuracy,
    yellow_cards: p.yellow_cards,
    red_cards: p.red_cards,
    team: p.team,
  };
}
