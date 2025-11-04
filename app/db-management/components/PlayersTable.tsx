import type { Team, Player } from "@prisma/client";

type PlayerWithTeam = Player & { team: Team | null };

interface Props {
  players: PlayerWithTeam[];
}

export default function PlayersTable({ players }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">
        📋 Joueurs
      </h2>
      <table className="w-full border border-gray-200 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Prénom</th>
            <th className="p-3 border-b">Nom</th>
            <th className="p-3 border-b">Numéro</th>
            <th className="p-3 border-b">Équipe</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((p) => (
              <tr
                key={p.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td className="p-3 border-b">{p.id}</td>
                <td className="p-3 border-b">{p.firstname}</td>
                <td className="p-3 border-b">{p.lastname}</td>
                <td className="p-3 border-b">{p.number}</td>
                <td className="p-3 border-b">{p.team?.name ?? "—"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Aucun joueur
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
