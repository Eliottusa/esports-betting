"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";

interface User {
  id: string;
  email: string;
  created: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const list = await pb.collection("users").getFullList<User>();
    setUsers(list);
  };

  useEffect(() => {
  const fetchUsersAsync = async () => {
    try {
      const list = await pb.collection("users").getFullList<User>();
      setUsers(list);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  fetchUsersAsync();
}, []);

  const handleLogout = async () => {
    await pb.authStore.clear();
    window.location.href = "/auth";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
          Déconnexion
        </button>
      </div>

      <div className="mb-6 space-x-4">
        <Link href="/admin/matches" className="bg-blue-500 text-white p-2 rounded">Gérer les matchs</Link>
        <Link href="/admin/bets" className="bg-green-500 text-white p-2 rounded">Voir les paris</Link>
      </div>

      <h2 className="text-xl font-bold mb-2">Liste des utilisateurs</h2>
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.id} className="border p-2 rounded">
            {u.email} - inscrit le {new Date(u.created).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
