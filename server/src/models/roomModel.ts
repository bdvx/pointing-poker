import { ClientModel } from "./clientModel";

export interface Room {
  roomId: string,
  //master: 
  players: Array<ClientModel>
}