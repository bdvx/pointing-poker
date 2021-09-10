import { RegistrationModel } from "./models/registrationModel";
import MongoDB from "./data-base/mongoDb";
import { SignInModel } from "./models/signInModel";

export default class DataService {
  static async addNewUser(user:RegistrationModel) {
    const status = await MongoDB.addNewUser(user);
    return status;
  }
 
  static async signInUser(user:SignInModel) {
    const status = await MongoDB.signIn(user);
    return status;
  }

  static async updateUser() {
  }
 
}