type MatchCardProps = {
  team1: string;
  team2: string;
  date: string;
  status: string;
};

export default function MatchCard({ team1, team2, date, status }: MatchCardProps) {
  return (
    <div className="border rounded shadow p-4 flex justify-between items-center">
      <span>{team1} vs {team2}</span>
      <span>{new Date(date).toLocaleString()}</span>
      <span className={status === "live" ? "text-green-500" : "text-gray-500"}>{status}</span>
    </div>
  );
}
