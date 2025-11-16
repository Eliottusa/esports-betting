"use client";
import { useState } from "react";
import { pb } from "@/lib/pocketbase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      setError("");
      if (isLogin) {
        // Login
        await pb.collection("users").authWithPassword(email, password);
      } else {
        // Signup
        await pb.collection("users").create({
          email,
          password,
          passwordConfirm: password,
        });
        await pb.collection("users").authWithPassword(email, password);
      }
      window.location.href = "/"; // redirige après login
    } catch (err) {
      setError("Erreur lors de l'authentification.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? "Se connecter" : "S'inscrire"}</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button onClick={handleAuth} className="w-full bg-blue-500 text-white p-2 rounded mb-2">
          {isLogin ? "Connexion" : "Inscription"}
        </button>
        <p className="text-sm text-center">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}
