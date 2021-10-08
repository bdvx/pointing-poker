import { Room } from "../serverService/models/roomModel";

function getUserByLogin(room:Room,userlogin: string) {
  const user = room.players.find((player) => player.login == userlogin);
  return user;
}

const clientService = {
    getUserByLogin
}

export default clientService;