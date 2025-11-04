import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: { team: true }, // ✅ récupère le nom de l’équipe
    });
    return NextResponse.json(players);
  } catch (error) {
    console.error("❌ Erreur GET /players :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const player = await prisma.player.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        number: Number(data.number),
        teamId: data.teamId ? Number(data.teamId) : null,
      },
    });
    return NextResponse.json(player);
  } catch (error) {
    console.error("❌ Erreur POST /players :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
