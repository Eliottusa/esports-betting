"use client";

import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";

type Team = {
  id: string;
  name: string;
};

type Match = {
  id: string;
  team1_id: string;
  team2_id: string;
  match_date: string;
  status: string;
};

export default function MatchesAdmin() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const teamsData = await pb.collection("teams").getFullList<Team>();
      setTeams(teamsData);

      const matchesData = await pb.collection("matches").getFullList<Match>();
      setMatches(matchesData);
    };
    fetchData();
  }, []);

  const createMatch = async () => {
    if (!team1 || !team2 || !date) return;

    const match = await pb.collection("matches").create<Match>({
      team1_id: team1,
      team2_id: team2,
      match_date: date,
      status: "upcoming",
    });

    setMatches([...matches, match]);
    setTeam1("");
    setTeam2("");
    setDate("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestion des matchs</h1>
      <select value={team1} onChange={(e) => setTeam1(e.target.value)} className="border p-2 mr-2">
        <option value="">Team 1</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <select value={team2} onChange={(e) => setTeam2(e.target.value)} className="border p-2 mr-2">
        <option value="">Team 2</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={createMatch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
      <ul className="mt-4">
        {matches.map((m) => {
          const t1 = teams.find((t) => t.id === m.team1_id)?.name || "Unknown";
          const t2 = teams.find((t) => t.id === m.team2_id)?.name || "Unknown";
          return (
            <li key={m.id} className="border p-2 rounded mb-2">
              {t1} vs {t2} - {new Date(m.match_date).toLocaleString()} ({m.status})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
