import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const teams = await prisma.team.findMany();
    return NextResponse.json(teams);
  } catch (error) {
    console.error("❌ Erreur GET /teams :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // ✅ Vérifier s’il y a déjà 2 équipes
    const count = await prisma.team.count();
    if (count >= 2) {
      return NextResponse.json(
        { error: "La base contient déjà 2 équipes maximum." },
        { status: 400 }
      );
    }

    // ✅ Créer l’équipe si la limite n’est pas atteinte
    const team = await prisma.team.create({
      data: {
        name: data.name,
        type: data.type,
      },
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error("❌ Erreur POST /teams :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
