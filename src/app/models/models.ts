export interface League {
  id: number;
  name: string;
  country?: string;
  logo?: string;
}

export interface Team {
  id: number;
  name: string;
  logo?: string;
}

export interface Player {
  id: number;
  name: string;
  photo?: string;
  nationality?: string;
  position: string;
  age: number;
  appearances: number | null;
  goals: number | null;
  assists: number | null;
  rating: number | null;
  pass_accuracy?: number | null;
  yellow_cards: number | null;
  red_cards: number | null;
  team?: string;
}

export interface TopScorer {
  name: string;
  team: string;
  goals: number;
  photo?: string;
}

export interface PlayersPage {
  items: Player[];
  totalPages: number;
}

export interface FilterState {
  season: number | null;
  leagueIds: number[];
  teamIds: number[];
  teamLeagueMap: Record<number, number>;
  availableTeams: Team[];
  position: string;
}
