"use client";

import { useEffect, useState } from "react";
import PlayerSelector from "./PlayerSelector";
import EventButtons from "./EventButtons";
import { Player } from "../types";
import { useEventStore } from "../store";

export default function ControlPanel() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("BUT");
  const [player, setPlayer] = useState<string>("");
  const [playerIn, setPlayerIn] = useState<string>("");
  const [playerOut, setPlayerOut] = useState<string>("");

  const setEvent = useEventStore((state) => state.setEvent);

  useEffect(() => {
    fetch("/api/players").then(res => res.json()).then(setPlayers);
  }, []);

  const handleDisplay = () => {
    const event = {
      type: selectedEvent,
      player:
        selectedEvent !== "CHANGEMENT"
          ? player
          : undefined,
      playerIn: selectedEvent === "CHANGEMENT" ? playerIn : undefined,
      playerOut: selectedEvent === "CHANGEMENT" ? playerOut : undefined,
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
          onChangePlayer={setPlayer}
          onChangePlayerIn={setPlayerIn}
          onChangePlayerOut={setPlayerOut}
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