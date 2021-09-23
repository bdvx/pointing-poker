import { RegistrationModel } from "../models/httpModels/registrationModel";
import MongoDB from "../data-base/mongoDb";
import { SignInModel } from "../models/httpModels/signInModel";

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
 
}