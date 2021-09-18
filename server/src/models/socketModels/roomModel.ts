import { WSClientModel } from "./clientModel";

export interface Room {
  roomId: string,
  players: Array<WSClientModel>,
  roomUrl: string
}