import type { Team } from "@prisma/client";

interface Props {
  teams: Team[];
}

export default function TeamsTable({ teams }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">
        📋 Équipes
      </h2>
      <table className="w-full border border-gray-200 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Nom</th>
            <th className="p-3 border-b">Type</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((t) => (
              <tr
                key={t.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td className="p-3 border-b">{t.id}</td>
                <td className="p-3 border-b">{t.name}</td>
                <td className="p-3 border-b">{t.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                Aucune équipe
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
