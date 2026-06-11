import { League, Team, Player, PlayersPage, TopScorer } from '../models/models';

export const MOCK_LEAGUES: League[] = [
  { id: 39,  name: 'Premier League', country: 'England' },
  { id: 140, name: 'La Liga',        country: 'Spain'   },
  { id: 78,  name: 'Bundesliga',     country: 'Germany' },
  { id: 135, name: 'Serie A',        country: 'Italy'   },
];

export const MOCK_TEAMS: Record<number, Team[]> = {
  39: [
    { id: 40, name: 'Liverpool'       },
    { id: 50, name: 'Manchester City' },
    { id: 33, name: 'Manchester Utd'  },
    { id: 42, name: 'Arsenal'         },
  ],
  140: [
    { id: 529, name: 'Barcelona'    },
    { id: 541, name: 'Real Madrid'  },
    { id: 548, name: 'Atletico'     },
  ],
  78: [
    { id: 157, name: 'Bayern Munich'      },
    { id: 165, name: 'Borussia Dortmund'  },
  ],
  135: [
    { id: 505, name: 'Inter'    },
    { id: 489, name: 'AC Milan' },
    { id: 496, name: 'Juventus' },
    { id: 492, name: 'Napoli'   },
  ],
};

const pl: Player[] = [
  { id: 1,  name: 'A. Alisson',          nationality: 'Brazil',       position: 'GK',  age: 32, appearances: 36, goals: 0,  assists: 0,  rating: 7.21, pass_accuracy: 78, yellow_cards: 0, red_cards: 0, team: 'Liverpool' },
  { id: 2,  name: 'T. Alexander-Arnold', nationality: 'England',      position: 'DEF', age: 26, appearances: 34, goals: 3,  assists: 13, rating: 7.54, pass_accuracy: 85, yellow_cards: 4, red_cards: 0, team: 'Liverpool' },
  { id: 3,  name: 'V. van Dijk',         nationality: 'Netherlands',  position: 'DEF', age: 33, appearances: 37, goals: 4,  assists: 1,  rating: 7.38, pass_accuracy: 88, yellow_cards: 3, red_cards: 0, team: 'Liverpool' },
  { id: 4,  name: 'I. Konaté',           nationality: 'France',       position: 'DEF', age: 25, appearances: 30, goals: 2,  assists: 1,  rating: 7.11, pass_accuracy: 82, yellow_cards: 5, red_cards: 1, team: 'Liverpool' },
  { id: 5,  name: 'A. Robertson',        nationality: 'Scotland',     position: 'DEF', age: 30, appearances: 28, goals: 0,  assists: 5,  rating: 6.98, pass_accuracy: 81, yellow_cards: 3, red_cards: 0, team: 'Liverpool' },
  { id: 6,  name: 'R. Gravenberch',      nationality: 'Netherlands',  position: 'MID', age: 22, appearances: 36, goals: 2,  assists: 4,  rating: 7.14, pass_accuracy: 87, yellow_cards: 4, red_cards: 0, team: 'Liverpool' },
  { id: 7,  name: 'A. Mac Allister',     nationality: 'Argentina',    position: 'MID', age: 26, appearances: 35, goals: 5,  assists: 5,  rating: 7.29, pass_accuracy: 89, yellow_cards: 6, red_cards: 0, team: 'Liverpool' },
  { id: 8,  name: 'D. Szoboszlai',       nationality: 'Hungary',      position: 'MID', age: 23, appearances: 33, goals: 4,  assists: 6,  rating: 7.08, pass_accuracy: 84, yellow_cards: 5, red_cards: 0, team: 'Liverpool' },
  { id: 9,  name: 'C. Jones',            nationality: 'Wales',        position: 'MID', age: 23, appearances: 29, goals: 3,  assists: 3,  rating: 6.95, pass_accuracy: 83, yellow_cards: 3, red_cards: 0, team: 'Liverpool' },
  { id: 10, name: 'M. Salah',            nationality: 'Egypt',        position: 'FWD', age: 32, appearances: 38, goals: 29, assists: 18, rating: 8.12, pass_accuracy: 80, yellow_cards: 1, red_cards: 0, team: 'Liverpool' },
  { id: 11, name: 'D. Núñez',            nationality: 'Uruguay',      position: 'FWD', age: 25, appearances: 34, goals: 18, assists: 8,  rating: 7.44, pass_accuracy: 70, yellow_cards: 4, red_cards: 1, team: 'Liverpool' },
  { id: 12, name: 'L. Díaz',             nationality: 'Colombia',     position: 'FWD', age: 27, appearances: 36, goals: 13, assists: 9,  rating: 7.32, pass_accuracy: 74, yellow_cards: 2, red_cards: 0, team: 'Liverpool' },
  { id: 13, name: 'C. Gakpo',            nationality: 'Netherlands',  position: 'FWD', age: 25, appearances: 32, goals: 11, assists: 5,  rating: 7.10, pass_accuracy: 72, yellow_cards: 2, red_cards: 0, team: 'Liverpool' },
  { id: 14, name: 'H. Elliott',          nationality: 'England',      position: 'MID', age: 21, appearances: 28, goals: 2,  assists: 4,  rating: 6.88, pass_accuracy: 82, yellow_cards: 3, red_cards: 0, team: 'Liverpool' },
  { id: 15, name: 'J. Gomez',            nationality: 'England',      position: 'DEF', age: 27, appearances: 25, goals: 0,  assists: 1,  rating: 6.84, pass_accuracy: 80, yellow_cards: 2, red_cards: 0, team: 'Liverpool' },
];

const mancity: Player[] = [
  { id: 20, name: 'E. Haaland',  nationality: 'Norway',      position: 'FWD', age: 24, appearances: 31, goals: 27, assists: 5,  rating: 7.89, pass_accuracy: 68, yellow_cards: 2, red_cards: 0, team: 'Manchester City' },
  { id: 21, name: 'K. De Bruyne',nationality: 'Belgium',     position: 'MID', age: 33, appearances: 18, goals: 3,  assists: 10, rating: 7.62, pass_accuracy: 90, yellow_cards: 1, red_cards: 0, team: 'Manchester City' },
  { id: 22, name: 'P. Foden',    nationality: 'England',     position: 'MID', age: 24, appearances: 35, goals: 11, assists: 7,  rating: 7.41, pass_accuracy: 87, yellow_cards: 3, red_cards: 0, team: 'Manchester City' },
  { id: 23, name: 'B. Silva',    nationality: 'Portugal',    position: 'MID', age: 30, appearances: 36, goals: 5,  assists: 9,  rating: 7.28, pass_accuracy: 92, yellow_cards: 2, red_cards: 0, team: 'Manchester City' },
  { id: 24, name: 'R. Dias',     nationality: 'Portugal',    position: 'DEF', age: 27, appearances: 33, goals: 1,  assists: 0,  rating: 7.15, pass_accuracy: 86, yellow_cards: 4, red_cards: 0, team: 'Manchester City' },
  { id: 25, name: 'M. Gvardiol', nationality: 'Croatia',     position: 'DEF', age: 22, appearances: 34, goals: 8,  assists: 2,  rating: 7.20, pass_accuracy: 83, yellow_cards: 3, red_cards: 0, team: 'Manchester City' },
  { id: 26, name: 'E. Ortega',   nationality: 'Switzerland', position: 'GK',  age: 28, appearances: 26, goals: 0,  assists: 0,  rating: 6.97, pass_accuracy: 75, yellow_cards: 0, red_cards: 0, team: 'Manchester City' },
  { id: 27, name: 'O. Doku',     nationality: 'Belgium',     position: 'FWD', age: 22, appearances: 30, goals: 6,  assists: 8,  rating: 7.02, pass_accuracy: 72, yellow_cards: 4, red_cards: 0, team: 'Manchester City' },
  { id: 28, name: 'M. Nunes',    nationality: 'Portugal',    position: 'MID', age: 26, appearances: 28, goals: 2,  assists: 3,  rating: 6.78, pass_accuracy: 85, yellow_cards: 5, red_cards: 0, team: 'Manchester City' },
  { id: 29, name: 'J. Doku',     nationality: 'Belgium',     position: 'FWD', age: 22, appearances: 25, goals: 4,  assists: 6,  rating: 6.95, pass_accuracy: 69, yellow_cards: 2, red_cards: 0, team: 'Manchester City' },
];

const arsenal: Player[] = [
  { id: 40, name: 'B. Raya',       nationality: 'Spain',    position: 'GK',  age: 29, appearances: 37, goals: 0,  assists: 0,  rating: 7.31, pass_accuracy: 77, yellow_cards: 1, red_cards: 0, team: 'Arsenal' },
  { id: 41, name: 'B. White',      nationality: 'England',  position: 'DEF', age: 27, appearances: 28, goals: 0,  assists: 4,  rating: 7.12, pass_accuracy: 83, yellow_cards: 2, red_cards: 0, team: 'Arsenal' },
  { id: 42, name: 'W. Saliba',     nationality: 'France',   position: 'DEF', age: 23, appearances: 36, goals: 1,  assists: 1,  rating: 7.40, pass_accuracy: 89, yellow_cards: 2, red_cards: 0, team: 'Arsenal' },
  { id: 43, name: 'D. Rice',       nationality: 'England',  position: 'MID', age: 26, appearances: 37, goals: 7,  assists: 8,  rating: 7.55, pass_accuracy: 90, yellow_cards: 7, red_cards: 1, team: 'Arsenal' },
  { id: 44, name: 'M. Ødegaard',   nationality: 'Norway',   position: 'MID', age: 26, appearances: 23, goals: 4,  assists: 7,  rating: 7.48, pass_accuracy: 88, yellow_cards: 2, red_cards: 0, team: 'Arsenal' },
  { id: 45, name: 'B. Saka',       nationality: 'England',  position: 'FWD', age: 23, appearances: 37, goals: 16, assists: 11, rating: 7.71, pass_accuracy: 82, yellow_cards: 3, red_cards: 0, team: 'Arsenal' },
  { id: 46, name: 'L. Trossard',   nationality: 'Belgium',  position: 'FWD', age: 30, appearances: 34, goals: 10, assists: 5,  rating: 7.08, pass_accuracy: 78, yellow_cards: 2, red_cards: 0, team: 'Arsenal' },
  { id: 47, name: 'K. Havertz',    nationality: 'Germany',  position: 'FWD', age: 25, appearances: 35, goals: 13, assists: 6,  rating: 7.18, pass_accuracy: 79, yellow_cards: 3, red_cards: 0, team: 'Arsenal' },
  { id: 48, name: 'G. Martinelli', nationality: 'Brazil',   position: 'FWD', age: 23, appearances: 32, goals: 8,  assists: 7,  rating: 6.98, pass_accuracy: 72, yellow_cards: 1, red_cards: 0, team: 'Arsenal' },
  { id: 49, name: 'T. Partey',     nationality: 'Ghana',    position: 'MID', age: 31, appearances: 22, goals: 1,  assists: 2,  rating: 6.85, pass_accuracy: 87, yellow_cards: 5, red_cards: 0, team: 'Arsenal' },
];

const barca: Player[] = [
  { id: 60, name: 'R. Araujo',        nationality: 'Uruguay',     position: 'DEF', age: 25, appearances: 28, goals: 1,  assists: 0,  rating: 7.20, pass_accuracy: 84, yellow_cards: 6, red_cards: 1, team: 'Barcelona' },
  { id: 61, name: 'F. de Jong',       nationality: 'Netherlands', position: 'MID', age: 27, appearances: 30, goals: 3,  assists: 5,  rating: 7.15, pass_accuracy: 91, yellow_cards: 3, red_cards: 0, team: 'Barcelona' },
  { id: 62, name: 'P. Gavi',          nationality: 'Spain',       position: 'MID', age: 20, appearances: 14, goals: 2,  assists: 3,  rating: 7.30, pass_accuracy: 88, yellow_cards: 4, red_cards: 0, team: 'Barcelona' },
  { id: 63, name: 'R. Lewandowski',   nationality: 'Poland',      position: 'FWD', age: 36, appearances: 34, goals: 19, assists: 8,  rating: 7.52, pass_accuracy: 70, yellow_cards: 2, red_cards: 0, team: 'Barcelona' },
  { id: 64, name: 'L. Yamal',         nationality: 'Spain',       position: 'FWD', age: 17, appearances: 35, goals: 15, assists: 20, rating: 8.01, pass_accuracy: 81, yellow_cards: 1, red_cards: 0, team: 'Barcelona' },
  { id: 65, name: 'R. Fermín López',  nationality: 'Spain',       position: 'MID', age: 21, appearances: 30, goals: 7,  assists: 4,  rating: 7.08, pass_accuracy: 84, yellow_cards: 2, red_cards: 0, team: 'Barcelona' },
  { id: 66, name: 'Iñigo Martínez',   nationality: 'Spain',       position: 'DEF', age: 33, appearances: 26, goals: 1,  assists: 0,  rating: 6.95, pass_accuracy: 87, yellow_cards: 5, red_cards: 0, team: 'Barcelona' },
  { id: 67, name: 'V. Ter Stegen',    nationality: 'Germany',     position: 'GK',  age: 32, appearances: 4,  goals: 0,  assists: 0,  rating: 7.10, pass_accuracy: 74, yellow_cards: 0, red_cards: 0, team: 'Barcelona' },
  { id: 68, name: 'P. Torre',         nationality: 'Spain',       position: 'MID', age: 22, appearances: 32, goals: 5,  assists: 6,  rating: 7.01, pass_accuracy: 86, yellow_cards: 3, red_cards: 0, team: 'Barcelona' },
  { id: 69, name: 'J. Cancelo',       nationality: 'Portugal',    position: 'DEF', age: 30, appearances: 28, goals: 2,  assists: 5,  rating: 7.18, pass_accuracy: 85, yellow_cards: 4, red_cards: 0, team: 'Barcelona' },
];

// Real API response data — page 1 of 3 for Inter, season 2024
const inter: Player[] = [
  { id: 161859, name: 'G. Oristanio',    nationality: 'Italy',       position: 'MID', age: 23, photo: 'https://media.api-sports.io/football/players/161859.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 322626, name: 'M. Zanotti',      nationality: 'Italy',       position: 'DEF', age: 22, photo: 'https://media.api-sports.io/football/players/322626.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 341823, name: 'A. Silvestro',    nationality: 'Italy',       position: 'DEF', age: 23, photo: 'https://media.api-sports.io/football/players/341823.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 2107,   name: 'Z. Vanheusden',   nationality: 'Belgium',     position: 'DEF', age: 26, photo: 'https://media.api-sports.io/football/players/2107.png',   appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 162445, name: 'F. Stanković',    nationality: 'Serbia',      position: 'GK',  age: 23, photo: 'https://media.api-sports.io/football/players/162445.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 451348, name: 'D. Zárate',       nationality: 'Colombia',    position: 'MID', age: 18, photo: 'https://media.api-sports.io/football/players/451348.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 161861, name: 'Jacopo Gianelli', nationality: 'Italy',       position: 'MID', age: 24, photo: 'https://media.api-sports.io/football/players/161861.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 386867, name: 'F. Stante',       nationality: 'Italy',       position: 'DEF', age: 20, photo: 'https://media.api-sports.io/football/players/386867.png', appearances: null, goals: null, assists: null, rating: null,   pass_accuracy: null, yellow_cards: null, red_cards: null, team: 'Inter' },
  { id: 30765,  name: 'I. Radu',         nationality: 'Romania',     position: 'GK',  age: 28, photo: 'https://media.api-sports.io/football/players/30765.png',  appearances: 0,    goals: 0,    assists: 0,    rating: 7.02,   pass_accuracy: null, yellow_cards: 0,    red_cards: 0,    team: 'Inter' },
  { id: 203474, name: 'N. Zalewski',     nationality: 'Poland',      position: 'MID', age: 23, photo: 'https://media.api-sports.io/football/players/203474.png', appearances: 13,   goals: 1,    assists: 1,    rating: 7.009,  pass_accuracy: null, yellow_cards: 4,    red_cards: 0,    team: 'Inter' },
  { id: 215,    name: 'S. Esposito',     nationality: 'Italy',       position: 'FWD', age: 23, photo: 'https://media.api-sports.io/football/players/215.png',    appearances: 34,   goals: 8,    assists: 0,    rating: 7.106,  pass_accuracy: null, yellow_cards: 1,    red_cards: 0,    team: 'Inter' },
  { id: 91488,  name: 'R. Di Gennaro',   nationality: 'Italy',       position: 'GK',  age: 32, photo: 'https://media.api-sports.io/football/players/91488.png',  appearances: 0,    goals: 0,    assists: null, rating: null,   pass_accuracy: null, yellow_cards: 0,    red_cards: 0,    team: 'Inter' },
  { id: 31009,  name: 'A. Bastoni',      nationality: 'Italy',       position: 'DEF', age: 26, photo: 'https://media.api-sports.io/football/players/31009.png',  appearances: 33,   goals: 1,    assists: 5,    rating: 7.218,  pass_accuracy: 55,   yellow_cards: 5,    red_cards: 0,    team: 'Inter' },
  { id: 31010,  name: 'F. Dimarco',      nationality: 'Italy',       position: 'DEF', age: 28, photo: 'https://media.api-sports.io/football/players/31010.png',  appearances: 34,   goals: 4,    assists: 7,    rating: 7.269,  pass_accuracy: null, yellow_cards: 3,    red_cards: 0,    team: 'Inter' },
  { id: 226,    name: 'D. Dumfries',     nationality: 'Netherlands', position: 'DEF', age: 29, photo: 'https://media.api-sports.io/football/players/226.png',    appearances: 33,   goals: 7,    assists: 2,    rating: 7.034,  pass_accuracy: null, yellow_cards: 4,    red_cards: 0,    team: 'Inter' },
  { id: 1836,   name: 'F. Acerbi',       nationality: 'Italy',       position: 'DEF', age: 37, photo: 'https://media.api-sports.io/football/players/1836.png',   appearances: 23,   goals: 0,    assists: 1,    rating: 7.087,  pass_accuracy: 51,   yellow_cards: 0,    red_cards: 0,    team: 'Inter' },
  { id: 194,    name: 'S. de Vrij',      nationality: 'Netherlands', position: 'DEF', age: 33, photo: 'https://media.api-sports.io/football/players/194.png',    appearances: 35,   goals: 3,    assists: 0,    rating: 7.056,  pass_accuracy: 50,   yellow_cards: 2,    red_cards: 0,    team: 'Inter' },
  { id: 329,    name: 'P. Zieliński',    nationality: 'Poland',      position: 'MID', age: 31, photo: 'https://media.api-sports.io/football/players/329.png',    appearances: 30,   goals: 2,    assists: 2,    rating: 6.840,  pass_accuracy: null, yellow_cards: 0,    red_cards: 0,    team: 'Inter' },
  { id: 30558,  name: 'N. Barella',      nationality: 'Italy',       position: 'MID', age: 28, photo: 'https://media.api-sports.io/football/players/30558.png',  appearances: 34,   goals: 3,    assists: 6,    rating: 7.238,  pass_accuracy: 44,   yellow_cards: 4,    red_cards: 0,    team: 'Inter' },
  { id: 31173,  name: 'D. Frattesi',     nationality: 'Italy',       position: 'MID', age: 26, photo: 'https://media.api-sports.io/football/players/31173.png',  appearances: 28,   goals: 5,    assists: 1,    rating: 6.800,  pass_accuracy: null, yellow_cards: 1,    red_cards: 0,    team: 'Inter' },
];

const PLAYER_MAP: Record<number, Player[]> = {
  40:  pl,
  50:  mancity,
  42:  arsenal,
  529: barca,
  505: inter,
};

const MOCK_PAGE_SIZE = 7;

export function getMockPlayersPage(teamId: number, page: number = 1): PlayersPage {
  const all = PLAYER_MAP[teamId] ?? [];
  const totalPages = Math.max(1, Math.ceil(all.length / MOCK_PAGE_SIZE));
  const items = all.slice((page - 1) * MOCK_PAGE_SIZE, page * MOCK_PAGE_SIZE);
  return { items, totalPages };
}

export function getMockTopScorers(leagueId: number): TopScorer[] {
  const teamIds: Record<number, number[]> = {
    39:  [40, 50, 33, 42],
    140: [529, 541, 548],
    135: [505, 489, 496, 492],
  };
  const ids = teamIds[leagueId] ?? [];
  const all = ids.flatMap(id => PLAYER_MAP[id] ?? []);
  return all
    .filter(p => p.goals != null && p.goals > 0)
    .sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))
    .slice(0, 5)
    .map(p => ({ name: p.name, team: p.team ?? '', goals: p.goals ?? 0, photo: p.photo }));
}
