"use client";

import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import MatchCard from "../../components/MatchCard";

type Match = {
  id: string;
  team1_id: string;
  team2_id: string;
  match_date: string;
  status: string;
};

type Team = {
  id: string;
  name: string;
};

export default function ResultsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const teamsData = await pb.collection("teams").getFullList<Team>();
      setTeams(teamsData);

      const matchesData = await pb.collection("matches").getFullList<Match>();
      setMatches(matchesData.filter((m) => m.status === "finished"));
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Résultats des matchs</h1>
      <div className="grid gap-4">
        {matches.map((m) => {
          const team1 = teams.find((t) => t.id === m.team1_id)?.name || "Unknown";
          const team2 = teams.find((t) => t.id === m.team2_id)?.name || "Unknown";
          return (
            <MatchCard
              key={m.id}
              team1={team1}
              team2={team2}
              date={m.match_date}
              status={m.status}
            />
          );
        })}
      </div>
    </div>
  );
}
