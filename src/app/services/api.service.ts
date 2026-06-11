import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { League, Team, Player, PlayersPage, TopScorer } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(`${this.base}/leagues`);
  }

  getTeams(leagueId: number, season: number): Observable<Team[]> {
    const params = new HttpParams()
      .set('league_id', leagueId)
      .set('season', season);
    return this.http.get<Team[]>(`${this.base}/teams`, { params });
  }

  getPlayers(leagueId: number, season: number, teamId?: number, page = 1, pageSize = 25): Observable<PlayersPage> {
    let params = new HttpParams()
      .set('league', leagueId)
      .set('season', season)
      .set('page', page)
      .set('per_page', pageSize);
    if (teamId != null) params = params.set('team', teamId);
    return this.http.get<PlayersPage>(`${this.base}/players`, { params });
  }

  getTopScorers(leagueId: number, season: number): Observable<TopScorer[]> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get<TopScorer[]>(`${this.base}/top-scorers`, { params });
  }
}
