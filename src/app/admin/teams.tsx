"use client";

import { useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";

type Team = {
  id: string;
  name: string;
};

export default function TeamsAdmin() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      // Ici on force le type générique <Team>
      const data = await pb.collection("teams").getFullList<Team>();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const createTeam = async () => {
    if (!newTeamName) return;

    const team = await pb.collection("teams").create<Team>({ name: newTeamName });
    setTeams([...teams, team]);
    setNewTeamName("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestion des équipes</h1>
      <input
        type="text"
        value={newTeamName}
        onChange={(e) => setNewTeamName(e.target.value)}
        placeholder="Nom de l'équipe"
        className="border p-2 mr-2"
      />
      <button onClick={createTeam} className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
      <ul className="mt-4">
        {teams.map((team) => (
          <li key={team.id} className="border p-2 rounded mb-2">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
