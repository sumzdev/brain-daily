export type GameType = 'stroop' | 'nback' | 'decision' | 'summarization' | 'emotion' | 'breathing' | 'ifThen';
export type GameStatus = 'pending' | 'playing' | 'completed';

export interface GameResult {
  correct: boolean;
  details: any;
}

export interface DailyProgram {
  id: GameType;
  name: string;
  description: string;
  status: GameStatus;
  score?: number;
  time?: number;
  results?: GameResult[];
}

export interface UserStats {
  streak: number;
  totalSessionsCompleted: number;
  lastCompletedDate: string;
  scores: Record<string, number[]>;
}

export interface GameProps {
  onComplete: (score: number, time: number, results?: GameResult[]) => void;
}
