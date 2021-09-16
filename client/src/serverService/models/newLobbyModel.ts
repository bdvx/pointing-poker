import { CurrentUserModel } from "../../store/currentUserSlice";

export interface NewLobbyModel {
  scramInfo: CurrentUserModel,
  roomId: string
} 