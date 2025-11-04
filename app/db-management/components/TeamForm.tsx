"use client";

import { useState } from "react";

interface Props {
  onCreated: () => void;
}

export default function TeamForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("DOMICILE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "❌ Erreur lors de l’ajout de l’équipe");
      return;
    }

    setName("");
    setType("DOMICILE");
    onCreated();
  };

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold border-b border-gray-300 pb-2">
        ➕ Ajouter une équipe
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap justify-center gap-3"
      >
        <input
          placeholder="Nom de l’équipe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 w-56"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-40"
        >
          <option value="DOMICILE">Domicile</option>
          <option value="EXTERIEUR">Extérieur</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md px-5 py-2 hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>
    </section>
  );
}
