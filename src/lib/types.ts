export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  total_bet: number;
  total_won: number;
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url?: string;
  founded_year?: number;
}

export interface Match {
  id: string;
  team1_id: string;
  team2_id: string;
  game_id: string;
  match_date: string;
  status: "scheduled" | "live" | "completed" | "cancelled";
  team1_score: number;
  team2_score: number;
  winner_id?: string;
  format: string;
}

export interface Bet {
  id: string;
  user_id: string;
  match_id: string;
  team_id: string;
  amount: number;
  odds: number;
  potential_payout: number;
  status: "pending" | "won" | "lost" | "cancelled";
}
