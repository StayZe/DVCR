import { Player } from "../types";

export default function PlayerSelector({
  eventType,
  players,
  onChangePlayer,
  onChangePlayerIn,
  onChangePlayerOut,
}: {
  eventType: string;
  players: Player[];
  onChangePlayer?: (value: string) => void;
  onChangePlayerIn?: (value: string) => void;
  onChangePlayerOut?: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {eventType === "CHANGEMENT" ? (
        <>
          <Select
            label="Joueur entrant"
            players={players}
            onChange={onChangePlayerIn}
          />
          <Select
            label="Joueur sortant"
            players={players}
            onChange={onChangePlayerOut}
          />
        </>
      ) : (
        <Select
          label="Joueur concerné"
          players={players}
          onChange={onChangePlayer}
        />
      )}
    </div>
  );
}

function Select({
  label,
  players,
  onChange,
}: {
  label: string;
  players: Player[];
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm">{label}</label>
      <select
        className="bg-gray-700 p-2 rounded"
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">Sélectionner...</option>
        {players.map((p) => (
          <option key={p.id} value={`${p.firstname} ${p.lastname}`}>
            {p.firstname} {p.lastname} ({p.number}) - {p.team.name}
          </option>
        ))}
      </select>
    </div>
  );
}
