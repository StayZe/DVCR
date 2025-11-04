"use client";

import { useState } from "react";
import type { Team } from "@prisma/client";

interface Props {
  teams: Team[];
  onCreated: () => void;
}

export default function PlayerForm({ teams, onCreated }: Props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        number: Number(number),
        teamId: Number(teamId),
      }),
    });

    setFirstname("");
    setLastname("");
    setNumber("");
    setTeamId("");
    onCreated();
  };

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold border-b border-gray-300 pb-2">
        ➕ Ajouter un joueur
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center gap-3"
      >
        <input
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-40"
        />
        <input
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-40"
        />
        <input
          type="number"
          placeholder="Numéro"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-24"
        />
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-48"
        >
          <option value="">-- Choisir une équipe --</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md px-5 py-2 hover:bg-green-700 transition"
        >
          Ajouter
        </button>
      </form>
    </section>
  );
}
