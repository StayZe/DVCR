import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const links = [
    {
      href: "/db-management",
      label: "Gestion de la base de données",
    },
    {
      href: "/obs",
      label: "Dashboard affichage OBS",
    },
  ];

  const externalLinks = [
    {
      href: "https://www.youtube.com/@drapeauvertcartonrouge8306",
      label: "YouTube",
      color: "bg-[#FF0000]",
    },
    {
      href: "https://www.facebook.com/",
      label: "Facebook",
      color: "bg-[#3b5998]",
    },
    {
      href: "https://restream.io/",
      label: "Restream",
      color: "bg-black",
    },
    {
      href: "https://docs.google.com/forms/u/0/?hl=fr&pli=1",
      label: "Google Form",
      color: "bg-[#7348B9]",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto p-6">
      <Image
        src="/img/logo-dvcr.png"
        width={400}
        height={400}
        alt="Logo Drapeau Vert Carton Rouge"
        className="w-32 h-auto mb-8"
        priority
      />
      <div className="flex flex-col w-full gap-4 p-6 border border-black rounded-2xl bg-white shadow-sm">
        {/* Liens internes */}
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            className="py-2 px-6 border border-black rounded-xl text-center hover:bg-gray-50 transition"
          >
            {label}
          </Link>
        ))}

        <div className="h-px w-full bg-gray-200" />

        {/* Liens externes */}
        {externalLinks.map(({ href, label, color }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full ${color} py-2 text-center text-white rounded-xl border hover:opacity-90 transition`}
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
