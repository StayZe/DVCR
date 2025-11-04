"use client";

import { useEffect, useState } from "react";
import TeamForm from "./components/TeamForm";
import PlayerForm from "./components/PlayerForm";
import TeamsTable from "./components/TeamsTable";
import PlayersTable from "./components/PlayersTable";
import type { Team, Player } from "@prisma/client";
import Image from "next/image";

type PlayerWithTeam = Player & { team: Team | null };

export default function DbManagement() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<PlayerWithTeam[]>([]);

  const loadData = async () => {
    const t = await fetch("/api/teams").then((r) => r.json());
    const p = await fetch("/api/players").then((r) => r.json());
    setTeams(t);
    setPlayers(p);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10 py-10 bg-gray-700">
      <Image
        src={"/img/logo-dvcr.png"}
        width={400}
        height={400}
        alt="logo cssa"
        className="h-32 w-auto bg-transparent"
      />
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-8 space-y-12">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Gestion de la base de données
        </h1>

        <TeamForm onCreated={loadData} />
        <PlayerForm teams={teams} onCreated={loadData} />
        <TeamsTable teams={teams} />
        <PlayersTable players={players} />
      </div>
    </div>
  );
}
