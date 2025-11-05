export interface Team {
  id: number;
  name: string;
  type: "DOMICILE" | "EXTERIEUR";
}

export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  number: number;
  teamId: number;
  team: Team;
}

export interface EventType {
  type: string;
  player?: string;
  playerIn?: string;
  playerOut?: string;
}
