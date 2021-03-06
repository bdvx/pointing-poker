import { RegistrationModel } from "../models/httpModels/registrationModel";
import MongoDB from "../data-base/mongoDb";
import { SignInModel } from "../models/httpModels/signInModel";
import { Room } from "../models/socketModels/roomModel";

export default class DataService {
  static async addNewUser(user:RegistrationModel) {
    const response = await MongoDB.addNewUser(user);
    return response;
  }
 
  static async signInUser(user:SignInModel) {
    const response = await MongoDB.signIn(user);
    return response;
  }

  static async getUserByLogin(login:string) {
    const response = await MongoDB.getUserByLogin(login);
    return response;
  }

  static saveRoom(room:Room) {
    MongoDB.saveRoom(room);
  }

  static async getGameById(gameId:string) {
    const response = await MongoDB.getGameById(gameId);
    return response;
  }
  
}