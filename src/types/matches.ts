export interface Matches {
  matches: Match[];
}

export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  startsAt: Date;
  endsAt: Date;
  isRunning: boolean;
  score: Score;
  playingTeam: number;
  story: string;
  teams: Team[];
}

export interface Score {
  [key: string]: string;
}

export interface Team {
  id: number;
  name: string;
  plays: string;
}
