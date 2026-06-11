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
  appearances: number;
  goals: number;
  assists: number;
  rating: number;
  pass_accuracy?: number;
  yellow_cards: number;
  red_cards: number;
  team?: string;
}

export interface TopScorer {
  name: string;
  club: string;
  goals: number;
  photo?: string;
}

export interface PlayersPage {
  items: Player[];
  total: number;
}

export interface FilterState {
  season: number | null;
  leagueId: number | null;
  teamId: number | null;
  position: string;
}
