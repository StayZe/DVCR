"use client";

import { useEffect, useState } from "react";
import PlayerSelector from "./PlayerSelector";
import EventButtons from "./EventButtons";
import { Player, Team } from "../types";
import { useEventStore } from "../store";

// ...existing code...
export default function ControlPanel() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("BUT");
  const [player, setPlayer] = useState<string>("");
  const [playerIn, setPlayerIn] = useState<string>("");
  const [playerOut, setPlayerOut] = useState<string>("");

  // changed team state types to match Team | ""
  const [playerTeam, setPlayerTeam] = useState<Team | "">("");
  const [playerInTeam, setPlayerInTeam] = useState<Team | "">("");
  const [playerOutTeam, setPlayerOutTeam] = useState<Team | "">("");

  const setEvent = useEventStore((state) => state.setEvent);

  useEffect(() => {
    fetch("/api/players").then(res => res.json()).then(setPlayers);
  }, []);

  // accept string | number and return Team | ""
  const findTeam = (id: string | number): Team | "" => {
    const idNum = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
    const p = players.find((pl) =>
      typeof idNum === "number" ? pl.id === idNum : String(pl.id) === String(idNum)
    );
    return p?.team ?? "";
  };

  // wrapper handlers that set both id and corresponding team
  const handleSetPlayer = (id: string | number) => {
    setPlayer(String(id));
    setPlayerTeam(findTeam(id));
  };

  const handleSetPlayerIn = (id: string | number) => {
    setPlayerIn(String(id));
    setPlayerInTeam(findTeam(id));
  };

  const handleSetPlayerOut = (id: string | number) => {
    setPlayerOut(String(id));
    setPlayerOutTeam(findTeam(id));
  };

  const handleDisplay = () => {
    const event = {
      type: selectedEvent,
      player:
        selectedEvent !== "CHANGEMENT"
          ? player
          : undefined,
      playerTeam:
        selectedEvent !== "CHANGEMENT"
          ? playerTeam
          : undefined,
      playerIn: selectedEvent === "CHANGEMENT" ? playerIn : undefined,
      playerInTeam: selectedEvent === "CHANGEMENT" ? playerInTeam : undefined,
      playerOut: selectedEvent === "CHANGEMENT" ? playerOut : undefined,
      playerOutTeam: selectedEvent === "CHANGEMENT" ? playerOutTeam : undefined,
    };
    setEvent(event);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Panneau de contrôle</h2>

      <EventButtons onSelect={setSelectedEvent} selected={selectedEvent} />

      <div>
        <h3 className="font-medium mb-2">Sélection joueur(s)</h3>
        <PlayerSelector
          eventType={selectedEvent}
          players={players}
          onChangePlayer={handleSetPlayer}
          onChangePlayerIn={handleSetPlayerIn}
          onChangePlayerOut={handleSetPlayerOut}
        />
      </div>

      <button
        onClick={handleDisplay}
        className="mt-6 bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
      >
        Afficher sur OBS
      </button>
    </div>
  );
}
// ...existing code...