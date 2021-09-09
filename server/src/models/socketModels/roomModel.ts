import { ClientModel } from "./clientModel";

export interface Room {
  roomId: string,
  players: Array<ClientModel>,
}