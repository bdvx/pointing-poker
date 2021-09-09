import { RegistrationModel } from "../models/httpModels/registrationModel";
import MongoDB from "../data-base/mongoDb";
import { SignInModel } from "../models/httpModels/signInModel";

export default class DataService {
  static async addNewUser(user:RegistrationModel) {
    const status = await MongoDB.addNewUser(user);
    return status;
  }
 
  static async signInUser(user:SignInModel) {
    const status = await MongoDB.signIn(user);
    return status;
  }

  static async getUserByLogin(login:string) {
    const status = await MongoDB.getUserByLogin(login);
    return status;
  }
 
}