"use client";

import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import TeamCard from "@/components/Teamcard";
import MatchCard from "@/components/MatchCard";
import Header from "@/components/header";
import Footer from "@/components/Footer";

// Types pour tes données PocketBase
interface Team {
  id: string;
  name: string;
  tag: string;
  logo_url: string;
}

interface Match {
  id: string;
  team1: Team;
  team2: Team;
  match_date: string; // ou Date si tu veux parser
  status: string;
}

export default function HomePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsList = await pb.collection("teams").getFullList<Team>();
        const matchesList = await pb.collection("matches").getFullList<Match>({
          sort: "-match_date",
          expand: "team1,team2", // important si tes champs team1 et team2 sont des relations
        });

        setTeams(teamsList);
        setMatches(matchesList);
      } catch (err) {
        console.error("Erreur fetchData:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Bienvenue sur Esports Betting</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Équipes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                name={team.name}
                tag={team.tag}
                logo_url={team.logo_url}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Prochains Matchs</h2>
          <div className="space-y-4">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1.name}
                team2={match.team2.name}
                date={match.match_date}
                status={match.status}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
