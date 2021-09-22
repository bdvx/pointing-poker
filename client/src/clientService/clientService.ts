import { Room } from "../serverService/models/roomModel";

let clientDispatch:any;

function setDispatch(dispatch:any) {
    clientDispatch = dispatch;
  }

function getUserByLogin(room:Room,userlogin: string) {
  const user = room.players.find((player) => player.login==userlogin);
  return user;
}

const clientService = {
    setDispatch,
    getUserByLogin
}

export default clientService;