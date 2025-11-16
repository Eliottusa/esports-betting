"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Esports Betting</h1>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-yellow-400">Accueil</Link>
        <Link href="/bets" className="hover:text-yellow-400">Parier</Link>
        <Link href="/results" className="hover:text-yellow-400">Résultats</Link>
        <Link href="/admin" className="hover:text-yellow-400">Admin</Link>
      </nav>
    </header>
  );
}
